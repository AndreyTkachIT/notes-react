import React, {useContext, useState} from "react";
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const Form = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const fireBase = useContext(FirebaseContext);

    const submitHandler = event => {
        event.preventDefault();

        if (value.trim()) {
            fireBase.addNote(value.trim()).then(() => {
                alert.show(`Заметка "${value.slice(0, 5)}" была создана!`, 'success', 3000);
            }).catch((e) => {
                alert.show(`Ошибка создания заметки: ${e.message}`, 'danger');
            });
            setValue('');
        } else {
            alert.show('Введите название заметки!');
        }
    };

    return (
        <form>
            <div className="form-row">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Введите текст заместки"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    ></input>
                </div>
                <button onClick={submitHandler} type="buttonAdd" className="btn btn-success">Add note</button>
            </div>
        </form>
    );
};

/*

* */
