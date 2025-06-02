import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import apiClient from "../http-commons";


/*
    React / Vue -> 데이터 관리
    TanStack-Query: 서버로부터 데이터 읽기, 데이터 캐싱, 캐시 제어 -> 데이터를 쉽고 효율적 관리(라이브러리 기능)

    기능
        1. 데이터 읽기 및 캐싱
        2. 동일 요청 시 중복 제거
        3. 새로운 데이터 유지 가능
        4. 네트워크 재연결, 요청 실패 시 자동 갱신

        useEffect(() => {

        }, []);
        -> queryKey: [curPage]
           queryFn:

 */
function RecipeList() {
    const [curPage, setCurPage] = useState(1);
    const {isLoading, data} = useQuery({
        queryKey: ["recipe-list", curPage],
        queryFn: async () => {
            try {
                const res = await apiClient.get(`/api/recipes/list/${curPage}`);
                console.log("응답 전체", res);
                return res.data;
            } catch (err) {
                console.log(err);
            }
        }
    });

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>
    }
    console.log(data);

    let totalPage = data.totalPage;
    let startPage = data.startPage;
    let endPage = data.endPage;
    let pageArr = [];

    const prev = () => {
        setCurPage(startPage - 1);
    }
    const next = () => {
        setCurPage(endPage + 1);
    }
    const pageChange = (e) => {
        setCurPage(e);
    }

    if (startPage > 1) {
        pageArr.push(<li><a className={"nav-link"} onClick={prev}>&lt;</a></li>);
    }
    for (let i = startPage; i <= endPage; i++) {
        if (i === curPage) {
            pageArr.push(<li className={"active"} key={i}><a className={"nav-link"} onClick={(e) => {e.preventDefault(); pageChange(i)}}>{i}</a></li>)
        } else {
            pageArr.push(<li key={i}><a className={"nav-link"} onClick={(e) => {e.preventDefault(); pageChange(i)}}>{i}</a></li>)
        }
    }
    if (endPage < totalPage) {
        pageArr.push(<li><a className={"nav-link"} onClick={next}>&gt;</a></li>);
    }

    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    {
                        data.fList && data.fList.map((recipe, index) =>
                            <div className="col-md-3" key={index}>
                                <div className="thumbnail">
                                    <Link to={"/recipe/detail/" + recipe.no}>
                                        <img src={recipe.poster} alt="Lights" style={{ width: "230px", height: "130px" }} />
                                        <div className="caption">
                                            <p>{recipe.title}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={"row text-center"} style={{ marginTop: "10px" }}>
                <ul className={"pagination"}>
                    {pageArr}
                </ul>
            </div>
        </>
    )
}

export default RecipeList;