import type { WhatsAppAdmin } from "@/types/site";

export type WhatsAppLinkOptions = {
  phoneNumber: string;
  message?: string;
};

export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

export function createWhatsAppLink({
  phoneNumber,
  message,
}: WhatsAppLinkOptions): string | null {
  const normalizedNumber = normalizePhoneNumber(phoneNumber);

  if (!/^\d{8,15}$/.test(normalizedNumber)) return null;

  const encodedMessage = message
    ? `?text=${encodeURIComponent(message.trim())}`
    : "";

  return `https://wa.me/${normalizedNumber}${encodedMessage}`;
}

export function createAdminWhatsAppLink(
  admin: WhatsAppAdmin | undefined,
  message?: string,
): string | null {
  if (!admin?.isActive) return null;

  return createWhatsAppLink({
    phoneNumber: admin.phoneNumber,
    message: message || admin.prefilledMessage,
  });
}
