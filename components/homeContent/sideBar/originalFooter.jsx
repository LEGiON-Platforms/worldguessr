{screen === "home" && !mapModal && !merchModal && !friendsModal && !accountModalOpen && !leagueModal && (
    <div className="home__footer fixed bottom-10 left-[calc(35%)] cursor-crosshair " style={{ zIndex: "5000" }}>
      <div className="footer_btns">
        {/* The footer with the youtube, discord and github icons at the bottom left */}
        {!isApp && (<>
          <Link target="_blank" href={"https://discord.com/invite/ubdJHjKtrC"}>
            <button className="home__squarebtn gameBtn discord" aria-label="Discord"><FaDiscord className="home__squarebtnicon" /></button>
          </Link>

          {!inCrazyGames && (
            <>
              <Link target="_blank" href={"https://www.youtube.com/@worldguessr?sub_confirmation=1"}><button className="home__squarebtn gameBtn youtube" aria-label="Youtube"><FaYoutube className="home__squarebtnicon" /></button></Link>
              <Link target="_blank" href={"https://github.com/codergautam/worldguessr"}><button className="home__squarebtn gameBtn" aria-label="Github"><FaGithub className="home__squarebtnicon" /></button></Link>
            </>
          )}
          <Link href={"/leaderboard" + (inCrazyGames ? "?crazygames" : "")}>

            <button className="home__squarebtn gameBtn" aria-label="Leaderboard"><FaRankingStar className="home__squarebtnicon" /></button>
          </Link>
          <button className="home__squarebtn gameBtn" aria-label="Settings" onClick={() => setSettingsModal(true)}><FaGear className="home__squarebtnicon" /></button>
        </>
        )}
      </div>
    </div>
  )}
  