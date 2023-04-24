interface CardProps {
  title: string;
  heading: string;
  text: string;
}

function Card({ title, heading, text }: CardProps) {
  return (
    <div className="mx-20 mt-4 flex content-center justify-center mobile:justify-start">
      <div className="block w-[19rem] rounded-lg bg-gray-50 shadow-lg">
        <div className="text-l border-b-2 border-neutral-100 bg-sky-200 px-4 py-3">
          {title}
        </div>

        <div className="p-4">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
            {heading}
          </h5>
          <p className="mb-4 text-base text-neutral-600">{text}</p>
          <img
            width={200}
            height={200}
            src="/bank.png"
            alt="Card Photo"
            className="mx-auto "
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
