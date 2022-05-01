interface Report {
  status: 'success' | 'warning' | 'error';
  message: string;
  license: string;
  package: string;
}

export { Report };
