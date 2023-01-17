import { useState } from "react";
import styles from "./Idea.module.css";
import { format } from "date-fns";
import { useContext } from "react";
import { IdeaContext, IdeaContextType } from "../../context/IdeaContext";

export interface IdeaProps {
  ideaTitle?: string;
  ideaDescription?: string;
  id?: number;
  timestamp?: number;
}

export const Idea = ({
  ideaTitle,
  ideaDescription,
  id,
  timestamp
}: IdeaProps) => {
  const { addIdea, updateIdea, deleteIdea } = useContext(
    IdeaContext
  ) as IdeaContextType;

  const [inputTitle, setInputTitle] = useState(ideaTitle || "");
  const [inputDescription, setInputDescription] = useState(
    ideaDescription || ""
  );

  const handleSubmission = (event: any) => {
    event.preventDefault();
    if (id) {
      updateIdea(id, inputTitle, inputDescription);
    } else {
      if (addIdea) addIdea(inputTitle, inputDescription);
      setInputTitle("");
      setInputDescription("");
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteIdea(id);
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
        {id && (
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
          {id && (
            <button data-testid="IdeaForm.buttonDelete" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
