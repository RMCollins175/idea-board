import { useState, useContext } from "react";
import styles from "./Card.module.css";
import { format } from "date-fns";
import { IdeaContext } from "../../context/IdeaContext";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      description: ""
    }
  });

  const [inputTitle, setInputTitle] = useState(ideaTitle || "");
  const [inputDescription, setInputDescription] = useState(
    ideaDescription || ""
  );

  const handleSubmission = (data: any) => {
    if (id) {
      updateIdea(id, inputTitle, inputDescription);
    } else {
      addIdea(data.title, data.description);
      reset();
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
      <form
        onSubmit={handleSubmit((data) => handleSubmission(data))}
        className={styles.ideaForm}
      >
        <label className={styles.ideaTitleLabel}>
          <input
            {...register("title")}
            placeholder="Title"
            required
            className={styles.ideaTitleInput}
            value={inputTitle ? inputTitle : undefined}
          />
        </label>
        <label
          className={styles.ideaDescriptionLabel}
          data-testid="IdeaForm.description"
        >
          <textarea
            {...register("description")}
            placeholder="Description"
            maxLength={140}
            className={styles.ideaDescriptionInput}
            value={inputDescription ? inputDescription : undefined}
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
          <button type="submit" data-testid="IdeaForm.buttonAdd">
            {id ? `Update` : `Add`}
          </button>

          <button type="button" onClick={() => reset()}>
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
