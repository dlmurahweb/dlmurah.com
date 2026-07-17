import type { WhatsAppAdmin } from "@/types/site";

export type WhatsAppLinkOptions = {
  phoneNumber: string;
  message?: string;
};

const DENIED_PHONE_NUMBERS = new Set([
  "620000000000",
  "0000000000",
  "00000000000",
  "000000000000",
]);

export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

export function isPublishablePhoneNumber(phoneNumber: string): boolean {
  const normalizedNumber = normalizePhoneNumber(phoneNumber);

  return (
    /^\d{8,15}$/.test(normalizedNumber) &&
    !DENIED_PHONE_NUMBERS.has(normalizedNumber)
  );
}

export function isContactPublishable(
  admin: WhatsAppAdmin | undefined,
): admin is WhatsAppAdmin {
  return Boolean(
    admin?.isActive && isPublishablePhoneNumber(admin.phoneNumber),
  );
}

export function createWhatsAppLink({
  phoneNumber,
  message,
}: WhatsAppLinkOptions): string | null {
  const normalizedNumber = normalizePhoneNumber(phoneNumber);

  if (!isPublishablePhoneNumber(normalizedNumber)) return null;

  const encodedMessage = message
    ? `?text=${encodeURIComponent(message.trim())}`
    : "";

  return `https://wa.me/${normalizedNumber}${encodedMessage}`;
}

export function createAdminWhatsAppLink(
  admin: WhatsAppAdmin | undefined,
  message?: string,
): string | null {
  if (!isContactPublishable(admin)) return null;

  return createWhatsAppLink({
    phoneNumber: admin.phoneNumber,
    message: message || admin.prefilledMessage,
  });
}
