import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./file/Home";
import GameConfig from "./file/GameConfig";
import Game from "./file/Game";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/gameconfig" element={<GameConfig />} />
				<Route path="/game" element={<Game />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
