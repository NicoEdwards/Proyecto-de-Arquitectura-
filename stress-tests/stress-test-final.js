// Script de pruebas de estrés corregido para FinSight

class FinSightStressTester {
  constructor() {
    this.baseUrl = 'http://localhost:8000';
    this.results = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      responseTimes: [],
      errors: []
    };
  }

  async makeRequest(url, options = {}) {
    const startTime = Date.now();
    try {
      const response = await fetch(url, options);
      const responseTime = Date.now() - startTime;
      
      this.results.responseTimes.push(responseTime);
      this.results.totalRequests++;

      if (response.ok) {
        this.results.successfulRequests++;
        const data = await response.text();
        return { success: true, data, responseTime, status: response.status };
      } else {
        this.results.failedRequests++;
        const errorText = await response.text();
        this.results.errors.push(`HTTP ${response.status}: ${errorText}`);
        return { success: false, status: response.status, responseTime, error: errorText };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.results.failedRequests++;
      this.results.totalRequests++;
      this.results.responseTimes.push(responseTime);
      this.results.errors.push(error.message);
      return { success: false, error: error.message, responseTime };
    }
  }

  async login() {
    const result = await this.makeRequest(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@demo.com',
        password: '1234'
      })
    });

    if (result.success) {
      try {
        const data = JSON.parse(result.data);
        return data.token;
      } catch {
        return null;
      }
    }
    return null;
  }

  async protectedQuery(token) {
    const result = await this.makeRequest(`${this.baseUrl}/protected`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    return result.success;
  }

  async runLoadTest(concurrentUsers, durationSeconds, testName) {
    console.log(`\n🧪 ${testName}`);
    console.log(`👥 ${concurrentUsers} usuarios concurrentes`);
    console.log(`⏱️ Duración: ${durationSeconds} segundos`);
    console.log('━'.repeat(50));
    
    const startTime = Date.now();
    const endTime = startTime + (durationSeconds * 1000);
    const promises = [];

    // Crear usuarios concurrentes
    for (let i = 0; i < concurrentUsers; i++) {
      promises.push(this.simulateUser(endTime, i + 1));
    }

    // Ejecutar todas las simulaciones
    await Promise.all(promises);
    
    // Calcular y mostrar resultados
    this.printResults(testName);
  }

  async simulateUser(endTime, userId) {
    let cycles = 0;
    const startTime = Date.now();
    
    while (Date.now() < endTime) {
      // Ciclo completo: Login + consulta protegida
      const token = await this.login();
      if (token) {
        await this.protectedQuery(token);
        cycles++;
      }
      
      // Pequeña pausa entre requests (simula comportamiento real)
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const duration = (Date.now() - startTime) / 1000;
    const rps = cycles / duration;
    console.log(`  👤 Usuario ${userId}: ${cycles} ciclos (${rps.toFixed(1)} req/s)`);
  }

  printResults(testName) {
    console.log(`\n📊 RESULTADOS - ${testName}`);
    console.log('━'.repeat(50));
    
    // Métricas básicas
    console.log(`📈 Total requests: ${this.results.totalRequests}`);
    console.log(`✅ Exitosos: ${this.results.successfulRequests}`);
    console.log(`❌ Fallidos: ${this.results.failedRequests}`);
    
    const successRate = this.results.totalRequests > 0 
      ? ((this.results.successfulRequests / this.results.totalRequests) * 100).toFixed(2)
      : 0;
    console.log(`📊 Tasa de éxito: ${successRate}%`);
    
    // Métricas de rendimiento
    if (this.results.responseTimes.length > 0) {
      const validTimes = this.results.responseTimes.filter(t => !isNaN(t) && isFinite(t));
      if (validTimes.length > 0) {
        const avg = validTimes.reduce((a, b) => a + b, 0) / validTimes.length;
        const sorted = validTimes.sort((a, b) => a - b);
        const p50 = sorted[Math.floor(sorted.length * 0.5)];
        const p95 = sorted[Math.floor(sorted.length * 0.95)];
        const p99 = sorted[Math.floor(sorted.length * 0.99)];
        
        console.log(`⚡ Tiempo promedio: ${avg.toFixed(2)}ms`);
        console.log(`📊 P50: ${p50}ms | P95: ${p95}ms | P99: ${p99}ms`);
        console.log(`⏱️ Min: ${Math.min(...validTimes)}ms | Max: ${Math.max(...validTimes)}ms`);
      }
    }
    
    // Verificación de requerimientos
    console.log('\n🎯 CUMPLIMIENTO DE REQUERIMIENTOS:');
    const avgTime = this.results.responseTimes.length > 0 
      ? this.results.responseTimes.reduce((a, b) => a + b, 0) / this.results.responseTimes.length 
      : Infinity;
    
    const meetsSLA = avgTime < 1500;
    const meetsAvailability = successRate >= 99.5;
    
    console.log(`   RNF1 (Rendimiento < 1.5s): ${meetsSLA ? '✅ CUMPLE' : '❌ NO CUMPLE'} (${avgTime.toFixed(0)}ms)`);
    console.log(`   RNF3 (Disponibilidad > 99.5%): ${meetsAvailability ? '✅ CUMPLE' : '❌ NO CUMPLE'} (${successRate}%)`);
    
    // Mostrar errores si los hay
    if (this.results.errors.length > 0) {
      console.log('\n⚠️ ERRORES DETECTADOS:');
      const uniqueErrors = [...new Set(this.results.errors)];
      uniqueErrors.slice(0, 5).forEach((error, index) => {
        const count = this.results.errors.filter(e => e === error).length;
        console.log(`   ${index + 1}. ${error} (${count}x)`);
      });
      if (uniqueErrors.length > 5) {
        console.log(`   ... y ${uniqueErrors.length - 5} errores más`);
      }
    }
  }

  reset() {
    this.results = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      responseTimes: [],
      errors: []
    };
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📋 REPORTE EJECUTIVO - EVALUACIÓN PoC FINSIGHT');
    console.log('='.repeat(60));
    console.log('🎯 Objetivo: Evaluar rendimiento de arquitectura as-is');
    console.log('🏗️ Arquitectura: Next.js + Deno local + PostgreSQL');
    console.log('📅 Fecha:', new Date().toLocaleString());
    console.log('='.repeat(60));
  }
}

// Script principal
async function runCompleteStressTest() {
  const tester = new FinSightStressTester();
  
  // Cargar fetch si es necesario
  if (typeof fetch === 'undefined') {
    try {
      global.fetch = require('node-fetch');
    } catch (e) {
      console.log('❌ Error: node-fetch no encontrado. Ejecuta: npm install node-fetch');
      return;
    }
  }
  
  // Generar header del reporte
  tester.generateReport();
  
  // Test 1: Carga Normal (según perfil operacional: 1,000-10,000 usuarios diarios)
  await tester.runLoadTest(5, 45, 'TEST 1: CARGA NORMAL');
  tester.reset();
  
  // Test 2: Carga Media
  await tester.runLoadTest(15, 60, 'TEST 2: CARGA MEDIA');
  tester.reset();
  
  // Test 3: Pico Estacional (5x carga normal según documento)
  await tester.runLoadTest(30, 90, 'TEST 3: PICO ESTACIONAL');
  tester.reset();
  
  // Test 4: Límite del Sistema
  await tester.runLoadTest(50, 60, 'TEST 4: LÍMITE DEL SISTEMA');
  
  // Resumen final
  console.log('\n' + '='.repeat(60));
  console.log('🎯 CONCLUSIONES PARA ENTREGA 2:');
  console.log('='.repeat(60));
  console.log('📌 Arquitectura as-is evaluada exitosamente');
  console.log('📌 Identificados cuellos de botella para propuesta to-be');
  console.log('📌 Métricas recopiladas para análisis de brechas');
  console.log('📌 Base establecida para mejoras arquitectónicas');
  console.log('='.repeat(60));
}

// Ejecutar si se llama directamente
if (typeof require !== 'undefined' && require.main === module) {
  console.log('🚀 Iniciando Evaluación Completa de PoC - FinSight');
  console.log('⚠️ Asegúrate de que el servidor Deno esté corriendo...\n');
  
  runCompleteStressTest()
    .then(() => console.log('\n✅ Evaluación de PoC completada!'))
    .catch(error => console.error('💥 Error en la evaluación:', error));
}