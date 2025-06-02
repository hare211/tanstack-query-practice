import { useParams, useNavigate, redirect } from "react-router";
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
        <div className={"container"}>
            <div className={"row"}>
                <h1 className={"text-center"}>{no}</h1>
            </div>
        </div>
    )
}

export default RecipeDetail;