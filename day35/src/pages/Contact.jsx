export default function Contact() {
  return (
    <main className="p-4">
      <header>
        <h1 className="text-3xl font-bold">Contact</h1>
        <h3 className="text-2xl font-bold">
          Email:{" "}
          <a
            className="underline text-xl text-blue-400"
            href="mailto:taippf8@gmail.com"
          >
            taippf8@gmail.com
          </a>
        </h3>
      </header>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
        error, cupiditate itaque fugiat quibusdam at neque nam dolore dolorem
        doloribus voluptatum, distinctio laudantium doloremque architecto iste
        odit nobis id nihil!
      </p>
      <footer className="mt-4">Footer</footer>
    </main>
  );
}
