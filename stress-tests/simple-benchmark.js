// Script con debugging mejorado para identificar el problema

class FinSightBenchmark {
  constructor() {
    this.baseUrl = 'http://localhost:8000';
    this.results = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      responseTimes: [],
      errors: []
    };
  }

  async makeRequest(url, options = {}) {
    const startTime = Date.now();
    try {
      console.log(`🔄 Intentando request a: ${url}`);
      const response = await fetch(url, options);
      const responseTime = Date.now() - startTime;
      
      console.log(`📡 Response status: ${response.status}, tiempo: ${responseTime}ms`);
      
      this.results.responseTimes.push(responseTime);
      this.results.totalRequests++;

      if (response.ok) {
        this.results.successfulRequests++;
        const data = await response.text();
        console.log(`✅ Success: ${data.substring(0, 100)}...`);
        return { success: true, data, responseTime, status: response.status };
      } else {
        this.results.failedRequests++;
        const errorText = await response.text();
        console.log(`❌ HTTP Error ${response.status}: ${errorText}`);
        this.results.errors.push(`HTTP ${response.status}: ${errorText}`);
        return { success: false, status: response.status, responseTime, error: errorText };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.results.failedRequests++;
      this.results.totalRequests++;
      this.results.responseTimes.push(responseTime);
      
      console.log(`💥 Request failed: ${error.message}`);
      this.results.errors.push(error.message);
      
      return { success: false, error: error.message, responseTime };
    }
  }

  async testConnectivity() {
    console.log('🔍 Probando conectividad básica...');
    
    // Prueba 1: Simple GET a la raíz
    console.log('\n1️⃣ Probando GET a la raíz...');
    const rootTest = await this.makeRequest(`${this.baseUrl}/`);
    
    // Prueba 2: Login con credenciales incorrectas
    console.log('\n2️⃣ Probando POST /login...');
    const loginTest = await this.makeRequest(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'wrong'
      })
    });
    
    // Prueba 3: Login con credenciales correctas
    console.log('\n3️⃣ Probando login correcto...');
    const correctLogin = await this.makeRequest(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@demo.com',
        password: '1234'
      })
    });
    
    return { rootTest, loginTest, correctLogin };
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
        if (data.token) {
          console.log(`🔑 Token obtenido: ${data.token.substring(0, 20)}...`);
          return data.token;
        }
      } catch (e) {
        console.log(`❌ Error parsing JSON: ${e.message}`);
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

  printDetailedResults() {
    console.log('\n📊 RESULTADOS DETALLADOS:');
    console.log('================================');
    console.log(`Total de requests: ${this.results.totalRequests}`);
    console.log(`Requests exitosos: ${this.results.successfulRequests}`);
    console.log(`Requests fallidos: ${this.results.failedRequests}`);
    
    if (this.results.totalRequests > 0) {
      const successRate = ((this.results.successfulRequests / this.results.totalRequests) * 100).toFixed(2);
      console.log(`Tasa de éxito: ${successRate}%`);
    }
    
    // Mostrar errores únicos
    if (this.results.errors.length > 0) {
      console.log('\n🚨 ERRORES ENCONTRADOS:');
      const uniqueErrors = [...new Set(this.results.errors)];
      uniqueErrors.forEach((error, index) => {
        const count = this.results.errors.filter(e => e === error).length;
        console.log(`${index + 1}. ${error} (${count} veces)`);
      });
    }
    
    if (this.results.responseTimes.length > 0) {
      const validTimes = this.results.responseTimes.filter(t => !isNaN(t) && isFinite(t));
      if (validTimes.length > 0) {
        const totalTime = validTimes.reduce((a, b) => a + b, 0);
        const avgTime = totalTime / validTimes.length;
        console.log(`\n⏱️ Tiempo promedio de respuesta: ${avgTime.toFixed(2)}ms`);
        console.log(`Tiempo máximo: ${Math.max(...validTimes)}ms`);
        console.log(`Tiempo mínimo: ${Math.min(...validTimes)}ms`);
      }
    }
  }
}

// Función principal con debugging
async function runDiagnostic() {
  const benchmark = new FinSightBenchmark();
  
  console.log('🚀 DIAGNÓSTICO DE CONECTIVIDAD - FinSight');
  console.log('==========================================\n');
  
  // Verificar si fetch está disponible
  if (typeof fetch === 'undefined') {
    try {
      global.fetch = require('node-fetch');
      console.log('✅ node-fetch cargado correctamente\n');
    } catch (e) {
      console.log('❌ Error cargando node-fetch:', e.message);
      console.log('   Ejecuta: npm install node-fetch\n');
      return;
    }
  }
  
  // Pruebas de conectividad
  const connectivityResults = await benchmark.testConnectivity();
  
  // Analizar resultados
  console.log('\n📋 ANÁLISIS DE RESULTADOS:');
  console.log('===========================');
  
  if (connectivityResults.rootTest.success || connectivityResults.loginTest.success || connectivityResults.correctLogin.success) {
    console.log('✅ El servidor está respondiendo');
    
    if (connectivityResults.correctLogin.success) {
      console.log('✅ Login funciona correctamente');
      
      // Intentar una prueba rápida
      console.log('\n🧪 Ejecutando prueba rápida...');
      const token = await benchmark.login();
      if (token) {
        await benchmark.protectedQuery(token);
      }
    } else {
      console.log('❌ Login no funciona - revisar credenciales o lógica de autenticación');
    }
  } else {
    console.log('❌ El servidor no está respondiendo');
    console.log('   1. Verifica que Deno esté corriendo: deno run --allow-all src/app/api/route.ts');
    console.log('   2. Verifica que esté en puerto 8000');
    console.log('   3. Verifica CORS si es necesario');
  }
  
  benchmark.printDetailedResults();
}

// Ejecutar diagnóstico
if (typeof require !== 'undefined' && require.main === module) {
  runDiagnostic().catch(console.error);
}

// Para Node.js sin fetch nativo
if (typeof fetch === 'undefined') {
  try {
    global.fetch = require('node-fetch');
  } catch (e) {
    console.log('⚠️ node-fetch no encontrado. Ejecuta: npm install node-fetch');
  }
}