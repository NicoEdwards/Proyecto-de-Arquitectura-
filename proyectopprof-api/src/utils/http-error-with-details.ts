// Types
type Details = Record<string, string>[];

interface HttpErrorWithDetailsProps {
  message: string;
  status: number;
  details?: Details;
}

export class HttpErrorWithDetails extends Error {
  public status: number;
  public details?: Details;

  constructor(
    { message, status, details }: HttpErrorWithDetailsProps,
  ) {
    super(message);
    this.name = new.target.name;
    this.status = status;
    this.details = details;
  }
}
