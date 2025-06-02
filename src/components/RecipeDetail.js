import { useParams, useNavigate, redirect } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../http-commons";

function RecipeDetail() {
    const {no} = useParams();
    const nav = useNavigate();
    /*
        화면 이동
        nav("/recipe/list")
        nav(-1) -> history.back
     */

    // 데이터 읽기
    const {isLoading, error, isError, data} = useQuery({
        queryKey: ['detail', no],
        queryFn: async () => {
            try {
                const res = await apiClient.get(`http://localhost/api/recipes/detail/${no}`);
                return res.data;
            } catch (err) {
                return err;
            }
        }
    });

    if (isLoading) {
        return (
            <h1 className={"text-center"}>Loading...</h1>
        )
    }

    if (isError) {
        return (
            <h1 className={"text-center"}>Server Error Occurred: {error}</h1>
        )
    }

    console.log('data: ', data);

    return (
        data.vo &&
        <div className={"container"}>
            <div className={"row"}>
                <table className={"table"}>
                    <tr>
                        <td className={"text-center"} colSpan={"3"}>
                            <img src={data.vo.poster} alt="" style={{ width: "800px", height: "400px" }} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"} colSpan={"3"}>
                            <h3>{data.vo.title}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"}>
                            <img src={"/icon/a1.png"} alt=""/>
                        </td>
                        <td className={"text-center"}>
                            <img src={"/icon/a2.png"} alt=""/>
                        </td>
                        <td className={"text-center"}>
                            <img src={"/icon/a3.png"} alt=""/>
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"}>{data.vo.info1}</td>
                        <td className={"text-center"}>{data.vo.info2}</td>
                        <td className={"text-center"}>{data.vo.info3}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default RecipeDetail;