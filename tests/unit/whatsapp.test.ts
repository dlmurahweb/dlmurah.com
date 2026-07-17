import assert from "node:assert/strict";
import test from "node:test";

import {
  createAdminWhatsAppLink,
  createWhatsAppLink,
  isContactPublishable,
  isPublishablePhoneNumber,
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

test("rejects documented sentinel and dummy phone numbers", () => {
  assert.equal(isPublishablePhoneNumber("620000000000"), false);
  assert.equal(isPublishablePhoneNumber("+62 0000 000000"), false);
  assert.equal(createWhatsAppLink({ phoneNumber: "620000000000" }), null);
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

test("does not publish an active admin with a sentinel phone number", () => {
  const admin: WhatsAppAdmin = {
    id: "admin-sentinel",
    name: "Admin Sentinel",
    role: "Admin",
    serviceCategory: "DL/BGL",
    phoneNumber: "620000000000",
    prefilledMessage: "Halo Admin",
    order: 1,
    isActive: true,
  };

  assert.equal(isContactPublishable(admin), false);
  assert.equal(createAdminWhatsAppLink(admin), null);
});
