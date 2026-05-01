import { fireEvent, render, screen } from "@testing-library/react";

import AuthPage from "./page";

const pushMock = jest.fn();
const refreshMock = jest.fn();
const searchParamsState = {
  value: new URLSearchParams(),
};

function mockFetchOnce(payload: unknown) {
  const fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => payload,
  });

  Object.defineProperty(globalThis, "fetch", {
    configurable: true,
    value: fetchMock,
  });

  return fetchMock;
}

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
  useSearchParams: () => searchParamsState.value,
}));

beforeEach(() => {
  searchParamsState.value = new URLSearchParams();
});

describe("AuthPage", () => {
  beforeEach(() => {
    pushMock.mockReset();
    refreshMock.mockReset();
  });

  it("renders sign in by default", () => {
    render(<AuthPage />);

    expect(
      screen.getByRole("heading", { name: "Supabase Auth" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Sign In" })).toHaveLength(2);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("switches identity input label when phone is selected", () => {
    render(<AuthPage />);

    fireEvent.click(screen.getByRole("button", { name: "Phone" }));

    expect(screen.getByLabelText("Phone (+country code)")).toBeInTheDocument();
  });

  it("switches to sign up mode", () => {
    render(<AuthPage />);

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(screen.getAllByRole("button", { name: "Sign Up" })).toHaveLength(2);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("falls back to the home page for an unsafe next redirect", async () => {
    searchParamsState.value = new URLSearchParams("next=https://evil.example");
    mockFetchOnce({ ok: true, message: "Authentication successful." });

    render(<AuthPage />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "secret123" },
    });
    fireEvent.submit(
      screen.getByLabelText("Password").closest("form") as HTMLFormElement,
    );

    expect(
      await screen.findByText("Authentication successful."),
    ).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
