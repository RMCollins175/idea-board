import { useState, useContext } from "react";
import styles from "./Card.module.css";
import { format } from "date-fns";
import { IdeaContext } from "../../context/IdeaContext";

export interface CardProps {
  idea?: any;
}

export const Card = ({ idea }: CardProps) => {
  const { addIdea, updateIdea, deleteIdea } = useContext(IdeaContext);

  const [inputTitle, setInputTitle] = useState(idea?.ideaTitle || "");
  const [inputDescription, setInputDescription] = useState(
    idea?.ideaDescription || ""
  );

  const handleSubmission = (event: any) => {
    event.preventDefault();
    if (idea.id) {
      updateIdea(idea.id, inputTitle, inputDescription);
    } else {
      if (addIdea) addIdea(inputTitle, inputDescription);
      setInputTitle("");
      setInputDescription("");
    }
  };

  const handleDelete = () => {
    if (idea.id) {
      deleteIdea(idea.id);
    }
  };

  const handleDescriptionChange = (event: any) => {
    if (event.target.value.length < 140) {
      setInputDescription(event.target.value);
    }
  };

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
        {idea.id && (
          <p className={styles.ideaTimestamp}>
            {`${
              idea.timestamp &&
              format(new Date(idea.timestamp), "yyyy-MM-dd - HH:mm:ss")
            }`}
          </p>
        )}
        <div className={styles.callToActionContainer}>
          <button
            type="submit"
            data-testid="IdeaForm.buttonAdd"
            disabled={!inputTitle || !inputTitle.trim()}
          >
            {idea.id ? `Update` : `Add`}
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
          {idea.id && (
            <button data-testid="IdeaForm.buttonDelete" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
