import React from "react";
import { DatePicker } from "antd";
import { Controller } from "react-hook-form";

// control을 받아오고,
function InputDatePicker({ control }) {
    const dateFormat = "YYYY-MM-DD";

    return (
        // Controller를 선언한 후 control을 속성으로 넣어주면 된다.
        <Controller
            control={control}
            name="installDate"
            format={dateFormat}
            // render를 사용해서, field값을 복사하거나 꺼내 쓰면 된다.
            // field안에는 value나 onBlur와 같은 함수도 있음
            // render안의 onChange를 조작해, onChange안에 들어갈 값을
            // 선택할 수 있다.
            render={({ field: { onChange } }) => (
                // antd의 datepicker에서 e.target.value는
                // moment 객체 그대로를 반환하기에,
                // "2021-04-15"와 같은 값을 얻고싶다면, 두번째 파라미터
                // "dateString"을 추가해서 값을 넣어야 한다.
                <DatePicker
                    renderExtraFooter={() => ""}
                    onChange={(value, dateString) => {
                        onChange(dateString);
                    }}
                    format={dateFormat}
                    style={{ width: "55%", height: "40px" }}
                    placeholder="날짜를 선택하세요"
                />
            )}
        />
    );
}

export default InputDatePicker;
