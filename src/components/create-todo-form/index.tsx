import style from './style.module.scss';
import inputStyle from '../input/style.module.scss';

import clsx from 'clsx';

import React, { memo, useState } from 'react';

import Button from '../button';
import Input from '../input';

import DatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
registerLocale('ru', ru);

import 'react-datepicker/dist/react-datepicker.css';
import { add } from 'date-fns';
import { TTodoDto } from '@/containers/create-todo-wrapper/types';
import { TFunction } from 'i18next';

const initialFormData: TTodoDto = {
  title: '',
  descr: '',
  dateEnd: '',
};

type TProps = {
  onSubmit: (todo: TTodoDto) => void;
  submitDisabled: boolean;
  t: TFunction<'ns1', undefined>;
};

function CreateTodoForm({ onSubmit, submitDisabled, t }: TProps) {
  const [formData, setFormData] = useState(initialFormData);

  const callbacks = {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    },
    handleDateChange: (date: string) => setFormData({ ...formData, dateEnd: date }),
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();

      onSubmit(formData);
      setFormData(initialFormData);
    },
  };

  const options = {
    isSubmitBtnDisabled: Object.values(formData).some((val) => !val.length) || submitDisabled,
  };

  return (
    <form onSubmit={callbacks.onSubmit} className={style.form} autoComplete="off">
      <div className={style.formRow}>
        <label className={style.label}>
          <span className={style.labelText}>{t('createTaskForm.title.label')}:</span>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={callbacks.onChange}
            placeholder={t('createTaskForm.title.placeholder')}
          />
        </label>
      </div>
      <div className={style.formRow}>
        <label className={style.label}>
          <span className={style.labelText}>{t('createTaskForm.descr.label')}:</span>
          <Input
            multiline
            placeholder={t('createTaskForm.descr.placeholder')}
            name="descr"
            value={formData.descr}
            onChange={callbacks.onChange}
          />
        </label>
      </div>

      <div className={style.formRow}>
        <label className={style.label}>
          <span className={style.labelText}>{t('createTaskForm.endTime.label')}:</span>
          <DatePicker
            minDate={add(new Date(), { days: 1 })}
            placeholderText={t('createTaskForm.endTime.label')}
            className={clsx(style.input, inputStyle.input)}
            enableTabLoop={false}
            locale="ru"
            name="dateEnd"
            selected={formData.dateEnd ? new Date(formData.dateEnd) : undefined}
            onChange={(date) => callbacks.handleDateChange(date?.toISOString() || '')}
            onKeyDown={(e) => e.preventDefault()}
            dateFormat={'dd.MM.yyyy'}
          />
        </label>
      </div>

      <div className={style.formRow}>
        <Button disabled={options.isSubmitBtnDisabled} status={'success'} type="submit">
          {t('createTaskForm.submitBtn.text')}
        </Button>
      </div>
    </form>
  );
}

export default memo(CreateTodoForm);
