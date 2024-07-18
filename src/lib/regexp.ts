const regExp = {
  regExpId: /^[a-zA-Z0-9]{5,16}$/,
  regExpPassword:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/,
  regExpUsername: /^[ㄱ-ㅎ가-힣]{2,6}/,
  regExpNickname: /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{4,12}$/,
  regExpEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
}

export default regExp
