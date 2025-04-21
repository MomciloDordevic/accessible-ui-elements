import Button from "./components/Button";
import Link from "./components/Link";
import Accordion from "./components/Accordion";
import Dropdown from "./components/Dropdown";
import Modal from "./components/Modal";
import Toggle from "./components/Toggle";
import Tabs from "./components/Tabs";
import AccessibleForm from "./components/AccessibleForm";
import Tooltip from "./components/Tooltip";
import ToastContainer from "./components/ToastContainer";
import RangeSlider from "./components/RangeSlider";
import Pagination from "./components/Pagination";
import Breadcrumbs from "./components/Breadcrumbs";
import Calendar from "./components/Calendar";
import ColorPicker from "./components/ColorPicker";
import { useTheme } from "./hooks/useTheme";
import { useState, useEffect } from "react";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  useEffect(() => {
    document.body.classList.add("loaded");
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

  <Breadcrumbs
    items={[
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Accessible UI", isCurrent: true }
    ]}
  />

  <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
    Accessible UI Elements
  </h1>

  <div className="flex justify-center mb-6">
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white shadow hover:bg-gray-400 dark:hover:bg-gray-700 transition"
    >
      Toggle to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  </div>

  <section className="max-w-5xl mx-auto w-full space-y-10">

    {/* Navigation Components */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Navigation</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Tabs />
        <Dropdown />
      </div>
    </div>

    {/* Inputs & Controls */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Inputs & Controls</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Button onClick={() => alert("Clicked!")}>Click Me</Button>
        <Button disabled>Disabled Button</Button>
        <Toggle label="Enable Notifications" />
        <AccessibleForm />
        <RangeSlider label="Volume" min={0} max={100} step={5} defaultValue={30} />
        <ColorPicker />
        <Calendar />
      </div>
    </div>

    {/* Feedback & Display */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Feedback & Display</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Tooltip text="Click this button to launch the magic.">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Hover or Focus Me
          </button>
        </Tooltip>

        <ToastContainer />

        <div className="w-full">
          <Accordion title="What is WCAG?">
            WCAG stands for Web Content Accessibility Guidelines. It's a set of guidelines developed through the W3C process to improve web accessibility for people with disabilities.
          </Accordion>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Open Modal
          </button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            title="Accessible Modal"
          >
            <p>This is a modal that follows accessibility best practices.</p>
          </Modal>
        </div>
      </div>
    </div>

    {/* Links */}
    <div>
      <h2 className="text-xl font-semibold mb-4">Links</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="https://www.w3.org/WAI/" external>
          Learn about Accessibility
        </Link>
        <Link href="/about">Internal About Page (placeholder)</Link>
      </div>
    </div>

    {/* Pagination */}
    <div className="w-full flex justify-center py-6">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>

  </section>
</main>

  );
}

export default App;
