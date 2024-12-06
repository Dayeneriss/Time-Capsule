"use client";

export default function Footer() {
  return (
    <footer className="bg-card text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-gray-400">
          <p>© {new Date().getFullYear()} Time Capsule. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
