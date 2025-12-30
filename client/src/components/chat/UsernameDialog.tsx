import { useUser } from "@/context/useUser";
import React, { useState } from "react";
import { toast } from "sonner";
import { setUsername } from "@/api/user";

interface UsernameDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const USERNAME_REGEX = /^[a-z0-9_.]{3,20}$/;

const UsernameDialog = ({ open, setOpen }: UsernameDialogProps) => {
  const { setUser } = useUser();
  const [username, setUsernameValue] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = username.trim().toLowerCase();
    if (!USERNAME_REGEX.test(value)) {
      return toast.error(
        "Username must be 3–20 characters and can contain letters, numbers, _ or ."
      );
    }

    try {
      setLoading(true);
      const res = await setUsername(value);
      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          username: res.username,
        };
      });
      toast.success("Username set successfully");
      setOpen(false);
    } catch (err:any) {
      const message = err?.response?.data?.message || "Failed to set username";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative z-10 w-full max-w-md rounded-xl bg-zinc-900 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white">
              Set your username
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              This will be visible to other users in chats.
            </p>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <input
                autoFocus
                type="text"
                value={username}
                disabled={loading}
                onChange={(e) => setUsernameValue(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-indigo-500 py-2 text-sm font-medium text-white hover:bg-indigo-400 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save username"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UsernameDialog;
