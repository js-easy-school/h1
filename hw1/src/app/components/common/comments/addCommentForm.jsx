import React, { useEffect, useState } from "react";
import API from "../../../api";
import SelecteField from "../from/selecteField";
import TextAreaField from "..//from/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from 'prop-types'

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, serErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выбери от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                messsage: "Сообщение не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            name: users[userId].name,
            value: users[userId]._id
        }));
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelecteField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name="userId"
                />
            </form>
        </div>
    )
}