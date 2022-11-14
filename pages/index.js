import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { createClient } from "@supabase/supabase-js";


const PROJECT_URL = "https://vqxegtyyoklzqnvwmxuo.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxeGVndHl5b2tsenFudndteHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODk4NzAsImV4cCI6MTk4Mzg2NTg3MH0.6UQ1N9abxDUdFpjAPuiH0Y5Jd2gIVmkH9WF8WGU4lAc";
const supabase = createClient(PROJECT_URL, PROJECT_KEY);



function HomePage() {

    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState("");

    React.useEffect(() => {
        supabase.from("video").select("*").then((dados) => {
            const novasPlaylists = {...playlists};
            dados.data.forEach((video) => {
                if(!novasPlaylists[video.playlists]){
                    novasPlaylists[video.playlists] = [];
                }
                novasPlaylists[video.playlists].push(video);
            })
            setPlaylists(novasPlaylists);
        })
    }, [])

    return (
        <>


            <div>
                {/*Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}></Menu>
                <Header></Header>
                <Timeline searchValue={valorDoFiltro} playlists={playlists}></Timeline>
            </div>
        </>

    );
}

export default HomePage


const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-image: url(${({ bg }) => bg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: -220px;
    height: 280px;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`}></img>
                <div>
                    <h2>{config.name}</h2>
                    <p> {config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ searchValue, ...props }) {
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb}></img>
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>

                );
            })}
        </StyledTimeline>
    )
}