import React from "react";

const Airtable = () => {
	return (
		<div style={{ height: "93vh" }}>
			<iframe
				class="airtable-embed"
				src="https://airtable.com/embed/appOUWo1JV78OIjRW/shrfbIJEiLsuilBtL?backgroundColor=green&viewControls=on"
				frameborder="0"
				onmousewheel=""
				width="100%"
				height="100%"
				style={{ background: "transparent", border: "1px solid #ccc" }}
			></iframe>
		</div>
	);
};

export default Airtable;
