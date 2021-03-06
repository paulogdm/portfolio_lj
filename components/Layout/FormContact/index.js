import { memo, Fragment, useState, useEffect } from 'react'
import Anime from 'react-anime'
import { css } from 'emotion'
import Translate from 'components/Translate'
import Input from './Input'
import { useSendMail } from 'services/formContact'
import { MAIL_TARGET } from 'utils/config'

import styles from './styles.local.css'

const FormContact = memo(
  (props) => {
    // Initial state
    const [formData, setFormData] = useState({
      name: "",
      mail: "",
      message: "",
    })

    const [submitDisabled, setSubmitDisabled] = useState(true)

    // sendMailQuery is an object that holds our query status (success, failure, pending)
    // sendMail calls useSendMail hook for us
    const [query, sendMail] = useSendMail()

    // componentDidUpdate
    // Empty form fields when mail is sent
    useEffect(() => {
      if (query.success === true) {
        setFormData({
          name: "",
          mail: "",
          message: "",
        })
      }
      if (document.forms["sendEmail"].elements["*honeypot"].value === "" && document.forms["sendEmail"].checkValidity() && formData.name.trim() !== "" && formData.mail.trim() !== "" && formData.message.trim() !== "") {
        setSubmitDisabled(false)
      } else {
        setSubmitDisabled(true)
      }
    })

    // handle form submit
    function handleSubmit(e) {
      e.preventDefault()
      sendMail({
        sender: formData.name.trim(),
        email: formData.mail.trim(),
        message: formData.message.trim(),
        "*reply": "email",
        "*subject": "Nouveau mail",
        "*default_email": MAIL_TARGET
      })
    }

    return (
      <Fragment>
        <form className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl sm:px-20 md:px-0 sm:mx-auto md:mx-0 " name="sendEmail" role="form" onSubmit={handleSubmit}>
          <fieldset className={`${styles.wrapper}`}>
            <legend className="text-blue text-20 sm:text-35 font-bold mb-35">
              <Translate id="formContact.legend" />
            </legend>
            <div className="mb-40 sm:mb-50">
              <Input
                handleChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })}
                value={formData.name}
                label={<Translate id="formContact.fields.name" />}
                name="fc_name"
                type="text"
                tagType="input"
                pattern=".{3,50}"
                minLength="3"
                maxLength="50"
                size="50"
              />
            </div>
            <div className="mb-60 md:mb-40">
              <Input
                handleChange={e => setFormData({
                  ...formData,
                  mail: e.target.value
                })}
                value={formData.mail}
                label={<Translate id="formContact.fields.mail" />}
                name="fc_email"
                type="email"
                tagType="input"
                pattern=".{5,45}"
                maxLength="45"
                minLength="5"
                size="45"
                placeholder="        @"
                mask="99-99-9999" defaultValue="25-04-2019"
                pattern="[^@\s]+@[^@\s]+"
                />
            </div>
            <div className="mb-30 sm:mb-60">
              <Input
                handleChange={e => setFormData({
                  ...formData,
                  message: e.target.value
                })}
                value={formData.message}
                label={<Translate id="formContact.fields.message" />}
                name="fc_message"
                tagType="textarea"
                minLength="5"
                maxLength="250"
              />
            </div>
          </fieldset>
          <input type="hidden" name="*reply" value="email" />
          <input type="hidden" name="*subject" value="Lucas, un nouveau mail envoyé depuis ton site !" />
          <input type="hidden" name="*honeypot" />
          <button className={`${submitDisabled === true ? 'opacity-50' : 'opacity-100'} font-bold rounded-full text-blue border-blue border-2 border-solid px-20 py-10 mb-50 sm:mb-80 block mx-auto`} type="submit" disabled={submitDisabled}>
            <Translate id="formContact.submit" />
          </button>
        </form>
      </Fragment>
    )
  }
)

export default FormContact