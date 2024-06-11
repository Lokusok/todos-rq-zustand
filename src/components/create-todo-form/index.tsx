import style from './style.module.scss';

import React, { memo, useState } from 'react';
import clsx from 'clsx';

import Button from '../button';

const initialFormData = {
  title: '',
  descr: '',
  date: '',
};

function CreateTodoForm() {
  const [formData, setFormData] = useState(initialFormData);

  const callbacks = {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    },
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();

      alert(JSON.stringify(formData));
      setFormData(initialFormData);
    },
  };

  const options = {
    isSubmitBtnDisabled: Object.values(formData).some((val) => !val.length),
  };

  return (
    <form onSubmit={callbacks.onSubmit} className={style.form}>
      <div className={style.formRow}>
        <label className={style.label}>
          <span className={style.labelText}>Заголовок:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={callbacks.onChange}
            placeholder="Заголовок задачи"
            className={style.input}
          />
        </label>
      </div>
      <div className={style.formRow}>
        <label className={style.label}>
          <span className={style.labelText}>Описание:</span>
          <textarea
            placeholder="Описание задачи"
            name="descr"
            value={formData.descr}
            onChange={callbacks.onChange}
            className={clsx(style.input, style.textarea)}
          />
        </label>
      </div>

      <div className={style.formRow}>
        <label className={style.label}>
          <span className={style.labelText}>Дата конца:</span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={callbacks.onChange}
            className={style.input}
          />
        </label>
      </div>

      <div className={style.formRow}>
        <Button disabled={options.isSubmitBtnDisabled} status={'success'} type="submit">
          Создать
        </Button>
      </div>
    </form>
  );
}

export default memo(CreateTodoForm);
