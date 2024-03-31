"use client";
import { MdDelete } from "react-icons/md";
import { JobDeleteModal } from "./JobDeleteModal";
export default function EventCard({ ele, jobId }: any) {
  var date = ele.startDateTime;

  return (
    <div>
      <div className="card">
        <h3 className="card__title">{ele?.type}</h3>
        <p className="card__content">Round Number : {ele?.roundNumber} </p>

        <div className="card__date">{date}</div>

        <div className="card__arrow">
          <JobDeleteModal jobId={jobId} eventId={ele.id} />
        </div>
      </div>
      <style jsx>
        {`
          /* this card is inspired form this - https://georgefrancis.dev/ */

          .card {
            --border-radius: 0.75rem;
            --primary-color: #7257fa;
            --secondary-color: #3c3852;
            width: 210px;
            font-family: "Arial";
            padding: 1rem;
            cursor: pointer;
            border-radius: var(--border-radius);
            background: #f1f1f3;
            box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
            position: relative;
          }

          .card > * + * {
            margin-top: 1.1em;
          }

          .card .card__content {
            color: var(--secondary-color);
            font-size: 0.86rem;
          }

          .card .card__title {
            padding: 0;
            font-size: 1.3rem;
            font-weight: bold;
          }

          .card .card__date {
            color: #6e6b80;
            font-size: 0.8rem;
          }

          .card .card__arrow {
            position: absolute;
            background: var(--primary-color);
            padding: 0.4rem;
            border-top-left-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);
            bottom: 0;
            right: 0;
            transition: 0.2s;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .card svg {
            transition: 0.2s;
          }

          /* hover */

          .card:hover .card__arrow {
            background: #111;
          }

          .card:hover .card__arrow svg {
            transform: translateX(3px);
          }
        `}
      </style>
    </div>
  );
}
