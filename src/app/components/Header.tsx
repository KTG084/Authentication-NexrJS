"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out Successfully", "success");
    } catch (error: unknown) {
      console.log(error);
      showNotification("Failed to sign Out ", "error");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto">
        <div className="flex-1 px-2 lg:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-xl gap-2 normal-case font-bold"
            prefetch={true}
          >
            <span
              onClick={() => {
                showNotification("Welcome to ImageKit ReelsPro", "info");
              }}
            ></span>
            <Home className="w-5 h-5" />
            ImageKit ReelsPro
          </Link>
        </div>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch gap=2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <User className="w-5 h-5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
              >
                {session ? (
                  <>
                    <li className="px-4 py-1">
                      <span className="text-sm opacity-70">
                        {session.user?.email?.split("@")[0]}
                      </span>
                    </li>
                    <div className="divider my-1"></div>
                    <li>
                      <Link
                        href="/upload"
                        className="px-4 py-2 hover:bg-base-200 block w-full"
                      >
                        <span
                          onClick={() => {
                            showNotification(
                              "Welcome to Admin Dashboard",
                              "info"
                            );
                          }}
                        ></span>
                        Video Upload
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={handleSignOut}
                        className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:bg-base-200 bloack w-full"
                    >
                      <span
                        onClick={() => {
                          showNotification(
                            "Please Sign In to Continue",
                            "info"
                          );
                        }}
                      ></span>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
