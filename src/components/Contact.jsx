export default function Contact() {
  return (
    <section className="py-12 max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-primary-500">Contact</h2>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Reach me on GitHub or send an email.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <a
          href="https://github.com/asadyare"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-secondary-700 text-white px-6 py-2 rounded-lg hover:bg-secondary-600 transition-colors"
        >
          GitHub
        </a>

        <a
          href="mailto:walasaqo@gmail.com"
          className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Email Me
        </a>
      </div>
    </section>
  )
}
