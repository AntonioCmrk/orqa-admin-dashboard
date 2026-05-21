import { afterEach, describe, expect, it, vi } from "vitest";
import { loginRequest } from "./fakeApi";

afterEach(() => {
  vi.useRealTimers();
});

describe("loginRequest", () => {
  it("returns a token and user for the demo credentials", async () => {
    vi.useFakeTimers();

    const request = loginRequest({
      email: "admin@orqa.com",
      password: "password",
    });

    await vi.advanceTimersByTimeAsync(1000);

    const expectation = expect(request).resolves.toMatchObject({
      token: "admin-token",
      user: {
        email: "admin@orqa.com",
        role: "Admin",
      },
    });

    await expectation;
  });

  it("rejects invalid credentials", async () => {
    vi.useFakeTimers();

    const request = loginRequest({
      email: "wrong@orqa.com",
      password: "password",
    });

    const expectation = expect(request).rejects.toThrow(
      "Wrong email or password.",
    );

    await vi.advanceTimersByTimeAsync(1000);
    await expectation;
  });
});
