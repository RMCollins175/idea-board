import { useState, useContext } from "react";
import styles from "./Card.module.css";
import { format } from "date-fns";
import { IdeaContext } from "../../context/IdeaContext";

export interface CardProps {
  ideaTitle?: string;
  ideaDescription?: string;
  id?: string;
  timestamp?: number;
}

export const Card = ({
  ideaTitle,
  ideaDescription,
  id,
  timestamp
}: CardProps) => {
  const { addIdea, updateIdea, deleteIdea } = useContext(IdeaContext);

  const [inputTitle, setInputTitle] = useState(ideaTitle || "");
  const [inputDescription, setInputDescription] = useState(
    ideaDescription || ""
  );

  const handleSubmission = (event: any) => {
    event.preventDefault();
    if (id) {
      updateIdea(id, inputTitle, inputDescription);
    } else {
      addIdea(inputTitle, inputDescription);
      setInputTitle("");
      setInputDescription("");
    }
  };

  const handleDescriptionChange = (event: any) => {
    if (event.target.value.length < 140) {
      setInputDescription(event.target.value);
    }
  };

  const isAnIdea = !!id;

  return (
    <div className={styles.ideaContainer}>
      <form onSubmit={handleSubmission} className={styles.ideaForm}>
        <label className={styles.ideaTitleLabel}>
          <input
            data-testid="IdeaForm.title"
            type="text"
            name="title"
            id="title"
            className={styles.ideaTitleInput}
            placeholder="Title"
            onChange={(event) => setInputTitle(event.target.value)}
            value={inputTitle}
            required
          />
        </label>
        <label
          className={styles.ideaDescriptionLabel}
          data-testid="IdeaForm.description"
        >
          <textarea
            name="description"
            className={styles.ideaDescriptionInput}
            maxLength={140}
            placeholder="Description"
            onChange={handleDescriptionChange}
            value={inputDescription}
          />
        </label>
        {isAnIdea && (
          <p className={styles.ideaTimestamp}>
            {`${
              timestamp && format(new Date(timestamp), "yyyy-MM-dd - HH:mm:ss")
            }`}
          </p>
        )}
        <div className={styles.callToActionContainer}>
          <button
            type="submit"
            data-testid="IdeaForm.buttonAdd"
            disabled={!inputTitle || !inputTitle.trim()}
          >
            {id ? `Update` : `Add`}
          </button>
          <button
            className="ideaFormButton"
            data-testid="IdeaForm.buttonReset"
            onClick={() => {
              setInputTitle("");
              setInputDescription("");
            }}
          >
            Reset
          </button>
          {isAnIdea && (
            <button
              data-testid="IdeaForm.buttonDelete"
              onClick={() => deleteIdea(id)}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
