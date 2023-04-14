import { useState, ChangeEvent, KeyboardEvent } from "react";
import { IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.keyCode === 13) {
      props.addItem(title);
      setTitle(e.currentTarget.value);
      
    }
  };

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  return (
    <div>
      <TextField
        id="filled-basic"
        variant="outlined"
        label="Enter a value"
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addItem} color={'primary'}>
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
}
