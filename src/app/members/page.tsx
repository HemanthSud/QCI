"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";

export default function MembersPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-[70vh] flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-[70vh] px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 font-abril-fatface">
          Members Only
        </h1>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <p className="text-lg mb-2">
            <span className="font-semibold">Logged in as:</span> {user.email}
          </p>
          <p className="text-sm text-gray-600">
            User ID: {user.id}
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Exclusive Member Content</h2>
            <p className="text-gray-700 mb-4">
              Welcome to the QCI Members Portal! This is where exclusive content,
              updates, and resources are shared with our team members.
            </p>
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <p className="text-sm text-blue-900">
                Add your member-exclusive content here! This area is protected
                and only accessible to authenticated users.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">Member Features:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Access to private announcements</li>
              <li>Exclusive event information</li>
              <li>Member resources and files</li>
              <li>Direct communication with leadership</li>
            </ul>
          </section>
        </div>

        <button
          onClick={handleSignOut}
          className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
