const AdminRecipe = () => {
  return (
    <div>
      <div className="flex gap-x-2">
        <div>회원 정보 목록</div>
        <div>
          <input />
        </div>
        <div>검색</div>
      </div>
      <div className="grid grid-cols-[1fr_2fr_2fr_4fr_1fr_1fr_4fr_1fr] text-center">
        <div>체크</div>
        <div>사용자번호</div>
        <div>아이디</div>
        <div>이메일</div>
        <div>이름</div>
        <div>닉네임</div>
        <div>등록일자</div>
        <div>관리</div>
      </div>
    </div>
  )
}

export default AdminRecipe
