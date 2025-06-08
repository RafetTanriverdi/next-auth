import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignOutButton from "./SignOutButton";
import * as nextAuthReact from "next-auth/react";
import * as redirectModule from "@rt/lib/redirect";

describe("SignOutButton", () => {
  beforeAll(() => {
    jest.spyOn(redirectModule, "redirectTo").mockImplementation(() => {});
  });

  it("should call signOut when clicked", async () => {
    const signOutMock = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(nextAuthReact, "signOut").mockImplementation(signOutMock);

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <SignOutButton text="Sign Out" />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("Sign Out"));

    await waitFor(() => {
      expect(signOutMock).toHaveBeenCalledWith({ callbackUrl: "/login" });
      expect(redirectModule.redirectTo).toHaveBeenCalled();
    });
  });
});
