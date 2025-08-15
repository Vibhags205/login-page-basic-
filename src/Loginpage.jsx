import React, { useMemo, useState } from "react";
import { User, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", password: "", remember: false });

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      detectRetina: true,
      background: { color: "transparent" },
      fullScreen: { enable: false },
      particles: {
        number: { value: 60, density: { enable: true, area: 800 } },
        color: { value: "#ffffff" },
        opacity: { value: 0.25 },
        size: { value: 2 },
        links: { enable: true, color: "#ffffff", opacity: 0.12, width: 1 },
        move: { enable: true, speed: 0.6, outModes: { default: "out" } }
      },
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" }, resize: true },
        modes: { repulse: { distance: 80 } }
      }
    }),
    []
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.password) {
      setError("Please enter username and password.");
      return;
    }
    setLoading(true);
    // Fake login delay
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    alert(`Logged in as ${form.username}${form.remember ? " (remembered)" : ""}`);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden flex items-center justify-center bg-[#0b1020]">
      {/* neon blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 w-[42rem] h-[42rem] rounded-full bg-fuchsia-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 w-[42rem] h-[42rem] rounded-full bg-cyan-500/30 blur-3xl" />

      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_50%,rgba(255,255,255,0.04),rgba(0,0,0,0))]" />

      {/* particle lines */}
      <div className="absolute inset-0">
        <Particles id="tsparticles" options={options} />
      </div>

      {/* card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <h1 className="text-center text-3xl font-semibold mb-8 tracking-wide">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <label className="block">
              <span className="sr-only">Username</span>
              <div className="flex items-center h-12 rounded-full border border-white/10 bg-white/5 px-4 focus-within:border-white/30 focus-within:ring-2 focus-within:ring-fuchsia-500/40 transition">
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full bg-transparent outline-none placeholder-white/50 text-white"
                  autoComplete="username"
                />
                <div className="ml-3 grid place-items-center w-9 h-9 rounded-full bg-white/10">
                  <User size={18} />
                </div>
              </div>
            </label>

            {/* Password */}
            <label className="block">
              <span className="sr-only">Password</span>
              <div className="flex items-center h-12 rounded-full border border-white/10 bg-white/5 px-4 focus-within:border-white/30 focus-within:ring-2 focus-within:ring-fuchsia-500/40 transition">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-transparent outline-none placeholder-white/50 text-white"
                  autoComplete="current-password"
                />
                <div className="ml-3 grid place-items-center w-9 h-9 rounded-full bg-white/10">
                  <Lock size={18} />
                </div>
              </div>
            </label>

            {/* Row: remember + forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="h-4 w-4 rounded-sm accent-fuchsia-500/90"
                />
                <span className="text-white/80">Remember me</span>
              </label>
              <button type="button" className="text-white/80 hover:text-white underline underline-offset-4">
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-300 text-sm border border-red-500/40 bg-red-500/10 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-full bg-white text-black font-semibold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Login"}
            </button>

            <p className="text-center text-sm text-white/80">
              Don’t have an account? <a className="font-semibold underline underline-offset-4" href="#">Register</a>
            </p>
          </form>
        </div>
      </motion.div>

      {/* border frame like mockup */}
      <div className="pointer-events-none absolute inset-6 rounded-3xl border border-white/10" />
    </div>
  );
}
