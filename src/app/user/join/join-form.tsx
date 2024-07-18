import AuthButton from '@/components/common/auth-button'
import AuthInput from '@/components/common/auth-input'
import { useJoinForm } from './use-join-form'
import regExp from '@/lib/regexp'

const JoinForm = () => {
  const {
    formData,
    setFormData,
    validations,
    handleInputChange,
    handleInputBlur,
    handleJoinClick,
    handleValidationClick,
    handleEmailValidationClick,
    handleEmailAuthenticationCheckClick,
  } = useJoinForm()

  const renderInput = (
    id: keyof typeof formData,
    name: string,
    placeholder: string,
    type: string,
    reg?: RegExp,
    extraButton?: React.ReactNode,
    isGrid?: boolean,
  ) => (
    <div>
      <label className="label-text">{name}</label>
      <div
        className={`${isGrid ? 'grid grid-cols-[4fr_1fr]' : 'flex'} gap-x-2`}
      >
        <AuthInput
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={formData[id]}
          setValue={(value) =>
            setFormData((prev) => ({ ...prev, [id]: value }))
          }
          validation={validations[id]}
          onBlur={(e) => handleInputBlur(e, reg)}
        />
        {extraButton}
      </div>
    </div>
  )

  return (
    <form className="grow shrink space-y-1">
      {renderInput(
        'id',
        '아이디',
        '5~16자 대소문자, 숫자',
        'text',
        regExp.regExpId,
        <AuthButton type="button" onClick={() => handleValidationClick('id')}>
          중복 확인
        </AuthButton>,
        true,
      )}
      {renderInput(
        'password',
        '비밀번호',
        '8~16자 대문자, 특수문자 포함',
        'password',
        regExp.regExpPassword,
      )}
      {renderInput(
        'verifyPassword',
        '비밀번호 확인',
        '비밀번호 확인',
        'password',
      )}
      {renderInput(
        'username',
        '이름',
        '2~6자 한글 이름',
        'text',
        regExp.regExpUsername,
      )}
      {renderInput(
        'nickname',
        '닉네임',
        '4~12자 한글, 대소문자 영어',
        'text',
        regExp.regExpNickname,
        <AuthButton
          type="button"
          onClick={() => handleValidationClick('nickname')}
        >
          중복 확인
        </AuthButton>,
        true,
      )}
      {renderInput(
        'email',
        '이메일',
        '이메일',
        'email',
        regExp.regExpEmail,
        <AuthButton type="button" onClick={handleEmailValidationClick}>
          인증
        </AuthButton>,
        true,
      )}
      {renderInput(
        'certificationNumber',
        '인증번호 입력',
        '인증번호 입력',
        'text',
        undefined,
        <AuthButton type="button" onClick={handleEmailAuthenticationCheckClick}>
          확인
        </AuthButton>,
        true,
      )}
      {Object.entries(validations).map(
        ([key, value]) =>
          value.length > 0 && (
            <p
              key={key}
              className="relative text-[11px] ml-[6px] leading-3 text-red-50"
            >
              <span className="absolute top-[4px] left-[-5px] dot inline-block"></span>
              {value}
            </p>
          ),
      )}
      <div className="pt-1">
        <AuthButton type="button" onClick={handleJoinClick}>
          회원가입
        </AuthButton>
      </div>
    </form>
  )
}

export default JoinForm
