import assert from "node:assert/strict";
import test from "node:test";

import {
  createAdminWhatsAppLink,
  createWhatsAppLink,
  normalizePhoneNumber,
} from "../../src/lib/whatsapp";
import type { WhatsAppAdmin } from "../../src/types/site";

test("normalizes common phone-number punctuation", () => {
  assert.equal(normalizePhoneNumber("+62 (812)-3456 7890"), "6281234567890");
});

test("creates an encoded wa.me link", () => {
  assert.equal(
    createWhatsAppLink({
      phoneNumber: "+62 812-3456-7890",
      message: "Halo Admin, cek DL/BGL & akun?",
    }),
    "https://wa.me/6281234567890?text=Halo%20Admin%2C%20cek%20DL%2FBGL%20%26%20akun%3F",
  );
});

test("rejects invalid phone numbers", () => {
  assert.equal(createWhatsAppLink({ phoneNumber: "123" }), null);
  assert.equal(createWhatsAppLink({ phoneNumber: "" }), null);
});

test("does not link an inactive admin", () => {
  const admin: WhatsAppAdmin = {
    id: "admin-test",
    name: "Admin Test",
    role: "Admin",
    serviceCategory: "DL/BGL",
    phoneNumber: "+62 812-3456-7890",
    prefilledMessage: "Halo Admin",
    order: 1,
    isActive: false,
  };

  assert.equal(createAdminWhatsAppLink(admin), null);
  assert.match(
    createAdminWhatsAppLink({ ...admin, isActive: true }) ?? "",
    /^https:\/\/wa\.me\/6281234567890\?text=Halo%20Admin$/,
  );
});
