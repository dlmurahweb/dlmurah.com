export type LocalizedFields = Record<string, Record<string, unknown>>;

export function localizeFields(
  fields: Record<string, unknown>,
  locale: string,
): LocalizedFields {
  return Object.fromEntries(
    Object.entries(fields)
      .filter(([, value]) => value !== undefined)
      .map(([fieldId, value]) => [fieldId, { [locale]: value }]),
  );
}

export function mergeLocalizedFields(
  existingFields: LocalizedFields | undefined,
  nextFields: LocalizedFields,
): LocalizedFields {
  const merged: LocalizedFields = { ...(existingFields ?? {}) };

  for (const [fieldId, localizedValue] of Object.entries(nextFields)) {
    merged[fieldId] = {
      ...(merged[fieldId] ?? {}),
      ...localizedValue,
    };
  }

  return merged;
}
