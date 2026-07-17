import { redactSecretValues } from "../../src/lib/redaction";

export function redactContentfulErrorMessage(message: string): string {
  return redactSecretValues(message);
}
