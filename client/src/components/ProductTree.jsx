import React from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { useGetProductsTableQuery } from "state/api";

const TreeMap = ({ data }) => (
	<ResponsiveTreeMap
		root={data}
		identity="name"
		value="value"
		innerPadding={3}
		outerPadding={3}
		margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
		label="name"
		labelFormat=".0s"
		labelSkipSize={12}
		labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
		colors={{ scheme: "nivo" }}
		borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
		animate={true}
		motionStiffness={90}
		motionDamping={11}
	/>
);

const transformDataToTree = (data) => {
	const tree = { name: "root", children: [] };
	for (let row of data) {
		let path = ["root", row.Client, row.Category, row.ProductName];
		let current = tree;
		for (let node of path) {
			if (node !== path[path.length - 1]) {
				// if not at the leaf level
				let found = false;
				for (let child of current.children) {
					if (child.name === node) {
						current = child;
						found = true;
						break;
					}
				}
				if (!found) {
					// if the path is not found, create a new node
					let new_node = { name: node, children: [] };
					current.children.push(new_node);
					current = new_node;
				}
			} else {
				// at the leaf level, add value
				current.children.push({ name: node, value: 1 }); // use an appropriate value here
			}
		}
	}
	return tree;
};

const Tree = () => {
	const { data, isLoading, total, refetch } = useGetProductsTableQuery();

	console.log("THIS ONEEEEE", data);

	const validData = data?.docs ?? [];

	// transform the data to the required format
	const treeData = transformDataToTree(validData); // you need to implement this function

	return isLoading ? <div>Loading...</div> : <TreeMap data={treeData} />;
};

export default Tree;
