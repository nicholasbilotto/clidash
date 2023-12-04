import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TabView, TabPanel } from "primereact/tabview";
import { useGetProductsTableQuery } from "state/api";
import { useExportProductsQuery } from "state/api";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "../../App.css";
import { MultiSelect } from "primereact/multiselect";

const ProductTablePrime = () => {
	// **************************************************************** DECLARATIONS *******************************************************************
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(100);
	const [expandedRows, setExpandedRows] = useState(null);
	const [sort, setSort] = useState({ field: "ProductName", order: 1 });
	const [filters, setFilters] = useState({});
	const [globalFilterValue, setGlobalFilterValue] = useState();
	const sortParam = encodeURIComponent(JSON.stringify(sort));
	const dt = useRef(null);

	// Construct query parameters object
	const queryParam = {
		page: page,
		pageSize: pageSize,
		sort: sortParam,
		filters: encodeURIComponent(JSON.stringify(filters)),
		globalFilter: globalFilterValue,
	};

	// Construct the Products Object
	const { data, error, isLoading, refetch } =
		useGetProductsTableQuery(queryParam);

	// Construct the Export Object
	const {
		data: ordersData,
		error: ordersError,
		isLoading: ordersLoading,
		refetch: ordersRefetch,
	} = useExportProductsQuery(queryParam);

	//Final Declarations
	const products = data?.docs || [];
	const totalProducts = data?.totalDocs || 0;
	const exportableProducts = ordersData?.docs || [];

	const itemsPerPageOptions = [
		{ label: "100", value: 100 },
		{ label: "250", value: 250 },
		{ label: "500", value: 500 },
		{ label: "1000", value: 1000 },
	];

	// **************************************************************** FILTERING ********************************************************************
	// Options for the 'Client' dropdown filter

	useEffect(() => {
		console.log("Filters updated: ", filters);
	}, [filters]);

	const clientFilterItems = [
		"Beard Group",
		"Cherokee Media Group",
		"MJH",
		"Rodman Media",
		"SAE",
		"SPIE",
	].map((client) => ({ label: client, value: client }));

	// Options for the 'Category' dropdown filter
	const categoryFilterItems = [
		"Aerospace",
		"Automotive",
		"Business",
		"Clinical Research",
		"Computer Science",
		"Dental Health",
		"Electronics",
		"Energy",
		"Fabrics and Textiles",
		"Food and Nutrition",
		"Health Care",
		"Labels and Packaging",
		"Legal",
		"Lifestyle",
		"Machinery",
		"Manufacturing",
		"Medical",
		"Medical Imaging",
		"Optics",
		"Paints and Coatings",
		"Pharma",
		"Veterinary Science",
	].map((category) => ({ label: category, value: category }));

	const pubTypeFilterItems = [
		"Book",
		"Conference Session",
		"Journal",
		"Magazine",
		"Newsletter",
		"Video ",
		"Webinar",
		"eBook",
		"eConference Session",
		"eJournal",
	].map((category) => ({ label: category, value: category }));

	const onFilterChange = (e, field) => {
		let newFilters = { ...filters };
		newFilters[field] = {
			value: e.target.value,
			matchMode: FilterMatchMode.IN,
		};
		setFilters(newFilters);
	};

	const onGlobalFilterChange = (e) => {
		setGlobalFilterValue(e.target.value);
	};

	const onClientFilterChange = (e) => {
		let newFilters = { ...filters };
		if (e.value) {
			newFilters["Client"] = {
				value: e.value,
				matchMode: FilterMatchMode.CONTAINS,
			};
		} else {
			delete newFilters["Client"];
		}
		setFilters(newFilters);
	};

	const onCategoryFilterChange = (e) => {
		let newFilters = { ...filters };
		if (e.value) {
			newFilters["Category"] = {
				value: e.value,
				matchMode: FilterMatchMode.EQUALS,
			};
		} else {
			delete newFilters["Category"];
		}
		setFilters(newFilters);
	};

	const onPubTypeFilterChange = (e) => {
		let newFilters = { ...filters };
		if (e.value) {
			newFilters["PublicationType"] = {
				value: e.value,
				matchMode: FilterMatchMode.EQUALS,
			};
		} else {
			delete newFilters["PublicationType"];
		}
		setFilters(newFilters);
	};

	// ******************************************************************* EXPORTING *****************************************************************

	const exportCSV = () => {
		// Prepare headers for CSV
		const headers = [
			"Client",
			"ProductName",
			"Category",
			"PublicationType",
			"ISBN",
			"ISSN",
			"Url",
			"FirstYearPublished",
			"DOI",
			"Description",
			"IssuesPerYear",
			"PublicationFormats",
			"OnlineContentFrequency",
			"TopicsCovered",
			"AudienceDescription",
			"Circulation",
			"AnnualTraffic",
			"SubscriptionType",
			"AnnualSubPrice",
			"IndividualCopyPrice",
			"NumberOfEvents",
			"EventOne",
			"EventOneDescription",
			"EventOneRecording",
			"EventTwo",
			"EventTwoDescription",
			"EventTwoRecording",
			"EventThree",
			"EventThreeDescription",
			"EventThreeRecording",
			"NumberOfNewsletters",
			"NewsletterOne",
			"NewsletterOneFormat",
			"NewsletterOneDescription",
			"NewsletterOneFrequency",
			"NewletterOneUniqueness",
			"NewsletterTwo",
			"NewsletterTwoFormat",
			"NewsletterTwoDescription",
			"NewsletterTwoFrequency",
			"NewletterTwoUniqueness",
			"NewsletterThree",
			"NewsletterThreeFormat",
			"NewsletterThreeDescription",
			"NewsletterThreeFrequency",
			"NewletterThreeUniqueness",
			"ReportsResearch",
			"NumberOfReports",
			"ReportResearchDescription",
			"CompetitivePosition",
			"Competitor",
			"RetailPrice",
			"Publisher",
			"StaffDescription",
			"EditorName",
			"MarquisEditor",
			"Freelancers",
			"OwnFreelancerContent",
			"OriginalVideoMedia",
			"VideoMediaRights",
			"OriginalPhotoMedia",
			"PhotoMediaRights",
			"OriginalGraphs",
			"GraphsRights",
		].join(",");

		// Prepare the data for CSV
		const csvRows = products.map((product) => {
			return [
				product.Client || "",
				product.ProductName || "",
				product.Category || "",
				product.PublicationType || "",
				product.ISBN || "",
				product.ISSN || "",
				product.Url || "",
				product.FirstYearPublished || "",
				product.DOI || "",
				product.Description || "",
				product.IssuesPerYear || "",
				product.PublicationFormats || "",
				product.OnlineContentFrequency || "",
				product.TopicsCovered || "",
				product.AudienceDescription || "",
				product.Circulation || "",
				product.AnnualTraffic || "",
				product.SubscriptionType || "",
				product.AnnualSubPrice || "",
				product.IndividualCopyPrice || "",
				product.NumberOfEvents || "",
				product.EventOne || "",
				product.EventOneDescription || "",
				product.EventOneRecording || "",
				product.EventTwo || "",
				product.EventTwoDescription || "",
				product.EventTwoRecording || "",
				product.EventThree || "",
				product.EventThreeDescription || "",
				product.EventThreeRecording || "",
				product.NumberOfNewsletters || "",
				product.NewsletterOne || "",
				product.NewsletterOneFormat || "",
				product.NewsletterOneDescription || "",
				product.NewsletterOneFrequency || "",
				product.NewletterOneUniqueness || "",
				product.NewsletterTwo || "",
				product.NewsletterTwoFormat || "",
				product.NewsletterTwoDescription || "",
				product.NewsletterTwoFrequency || "",
				product.NewletterTwoUniqueness || "",
				product.NewsletterThree || "",
				product.NewsletterThreeFormat || "",
				product.NewsletterThreeDescription || "",
				product.NewsletterThreeFrequency || "",
				product.NewletterThreeUniqueness || "",
				product.ReportsResearch || "",
				product.NumberOfReports || "",
				product.ReportResearchDescription || "",
				product.CompetitivePosition || "",
				product.Competitor || "",
				product.RetailPrice || "",
				product.Publisher || "",
				product.StaffDescription || "",
				product.EditorName || "",
				product.MarquisEditor || "",
				product.Freelancers || "",
				product.OwnFreelancerMediaContent || "",
				product.OriginalVideoMedia || "",
				product.VideoMediaRights || "",
				product.OriginalPhotoMedia || "",
				product.PhotoMediaRights || "",
				product.OriginalGraphs || "",
				product.GraphsRights || "",
			]
				.map((field) => `"${field}"`)
				.join(","); // Enclose each field in quotes and join with comma
		});

		// Combine headers and rows
		const csvString = [headers, ...csvRows].join("\r\n");

		// Trigger CSV download
		const blob = new Blob([csvString], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.setAttribute("hidden", "");
		a.setAttribute("href", url);
		a.setAttribute("download", "products.csv");
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	// **************************************************************** HEADER / FOOTER **************************************************************
	const header = (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<div style={{ display: "flex", alignItems: "center" }}>
				<span className="text-xl text-900 font-bold">Products</span>
				{/* <span className="p-input-icon-left" style={{ marginLeft: "16px" }}>
					<i className="pi pi-search" />
					<InputText
						value={globalFilterValue}
						onChange={onGlobalFilterChange}
						placeholder="Keyword Search"
					/>
				</span> */}
			</div>
			<div style={{ display: "flex", alignItems: "center" }}>
				<label htmlFor="itemsPerPage" style={{ paddingRight: "8px" }}>
					Items per page
				</label>
				<Dropdown
					id="itemsPerPage"
					value={pageSize}
					options={itemsPerPageOptions}
					onChange={(e) => setPageSize(e.value)}
					placeholder="Select"
					style={{ width: "150px", marginRight: "8px" }}
				/>
				{/* <Button
					type="button"
					icon="pi pi-file-o"
					rounded
					onClick={exportCSVWithAllFields}
					data-pr-tooltip="CSV"
				/> */}
				<Button
					type="button"
					icon="pi pi-file-pdf"
					className="p-button-warning"
					rounded
					onClick={exportCSV}
					data-pr-tooltip="PDF"
				/>
			</div>
		</div>
	);

	const footer = `${products ? products.length : 0} of  ${totalProducts}`;

	// **************************************************************** ROW EXPANSION ****************************************************************
	const rowExpansionTemplate = (data) => {
		return (
			<div className="p-grid p-dir-col">
				<TabView className="p-mt-2">
					<TabPanel header="General Info">
						<div className="p-d-flex p-flex-column">
							{data.ISBN && (
								<div className="p-d-flex">
									<b>ISBN:</b> {data.ISBN}
								</div>
							)}
							{data.ISSN && (
								<div className="p-d-flex">
									<b>ISSN:</b> {data.ISSN}
								</div>
							)}
							{data.Url && (
								<div className="p-d-flex">
									<b>Url:</b> {data.Url}
								</div>
							)}
							{data.PublicationType && (
								<div className="p-d-flex">
									<b>PublicationType:</b> {data.PublicationType}
								</div>
							)}
							{data.FirstYearPublished && (
								<div className="p-d-flex">
									<b>FirstYearPublished:</b> {data.FirstYearPublished}
								</div>
							)}
							{data.DOI && (
								<div className="p-d-flex">
									<b>DOI:</b> {data.DOI}
								</div>
							)}
							{data.Description && (
								<div className="p-d-flex">
									<b>Description:</b> {data.Description}
								</div>
							)}
						</div>
					</TabPanel>
					<TabPanel header="Additional Details">
						<div className="p-d-flex p-flex-column">
							{data.IssuesPerYear && (
								<div className="p-d-flex">
									<b>IssuesPerYear:</b> {data.IssuesPerYear}
								</div>
							)}
							{data.PublicationFormats && (
								<div className="p-d-flex">
									<b>PublicationFormats:</b> {data.PublicationFormats}
								</div>
							)}
							{data.OnlineContentFrequency && (
								<div className="p-d-flex">
									<b>OnlineContentFrequency:</b>{" "}
									{data.OnlineContentFrequency}
								</div>
							)}
							{data.TopicsCovered && (
								<div className="p-d-flex">
									<b>TopicsCovered:</b> {data.TopicsCovered}
								</div>
							)}
							{data.FirstYearPublished && (
								<div className="p-d-flex">
									<b>FirstYearPublished:</b> {data.FirstYearPublished}
								</div>
							)}
							{data.DOI && (
								<div className="p-d-flex">
									<b>DOI:</b> {data.DOI}
								</div>
							)}
							{data.Uniqueness && (
								<div className="p-d-flex">
									<b>Uniqueness:</b> {data.Uniqueness}
								</div>
							)}
							{data.AverageNumberYearly && (
								<div className="p-d-flex">
									<b>AverageNumberYearly:</b>{" "}
									{data.AverageNumberYearly}
								</div>
							)}
							{data.DigitalArchive && (
								<div className="p-d-flex">
									<b>DigitalArchive:</b> {data.DigitalArchive}
								</div>
							)}
							{data.DigitalArchiveDate && (
								<div className="p-d-flex">
									<b>DigitalArchiveDate:</b> {data.DigitalArchiveDate}
								</div>
							)}
							{data.ArchiveCount && (
								<div className="p-d-flex">
									<b>ArchiveCount:</b> {data.ArchiveCount}
								</div>
							)}
							{data.Publisher && (
								<div className="p-d-flex">
									<b>Publisher:</b> {data.Publisher}
								</div>
							)}
							{data.StaffDescription && (
								<div className="p-d-flex">
									<b>StaffDescription:</b> {data.StaffDescription}
								</div>
							)}
							{data.EditorName && (
								<div className="p-d-flex">
									<b>EditorName:</b> {data.EditorName}
								</div>
							)}
							{data.MarquisEditor && (
								<div className="p-d-flex">
									<b>MarquisEditor:</b> {data.MarquisEditor}
								</div>
							)}
							{data.Freelancers && (
								<div className="p-d-flex">
									<b>Freelancers:</b> {data.Freelancers}
								</div>
							)}
							{data.OwnFreelancerContent && (
								<div className="p-d-flex">
									<b>OwnFreelancerContent:</b>{" "}
									{data.OwnFreelancerContent}
								</div>
							)}
							{data.OriginalVideoMedia && (
								<div className="p-d-flex">
									<b>OriginalVideoMedia:</b> {data.OriginalVideoMedia}
								</div>
							)}
							{data.VideoMediaRights && (
								<div className="p-d-flex">
									<b>VideoMediaRights:</b> {data.VideoMediaRights}
								</div>
							)}
							{data.OriginalPhotoMedia && (
								<div className="p-d-flex">
									<b>OriginalPhotoMedia:</b> {data.OriginalPhotoMedia}
								</div>
							)}
							{data.PhotoMediaRights && (
								<div className="p-d-flex">
									<b>PhotoMediaRights:</b> {data.PhotoMediaRights}
								</div>
							)}
							{data.OriginalGraphs && (
								<div className="p-d-flex">
									<b>OriginalGraphs:</b> {data.OriginalGraphs}
								</div>
							)}
							{data.GraphsRights && (
								<div className="p-d-flex">
									<b>GraphsRights:</b> {data.GraphsRights}
								</div>
							)}
							{data.AudienceDescription && (
								<div className="p-d-flex">
									<b>AudienceDescription:</b>{" "}
									{data.AudienceDescription}
								</div>
							)}
							{data.Circulation && (
								<div className="p-d-flex">
									<b>Circulation:</b> {data.Circulation}
								</div>
							)}
							{data.AnnualTraffic && (
								<div className="p-d-flex">
									<b>AnnualTraffic:</b> {data.AnnualTraffic}
								</div>
							)}
							{data.SubscriptionType && (
								<div className="p-d-flex">
									<b>SubscriptionType:</b> {data.SubscriptionType}
								</div>
							)}
							{data.AnnualSubPrice && (
								<div className="p-d-flex">
									<b>AnnualSubPrice:</b> {data.AnnualSubPrice}
								</div>
							)}
							{data.IndividualCopyPrice && (
								<div className="p-d-flex">
									<b>IndividualCopyPrice:</b>{" "}
									{data.IndividualCopyPrice}
								</div>
							)}
							{data.NumberOfEvents && (
								<div className="p-d-flex">
									<b>NumberOfEvents:</b> {data.NumberOfEvents}
								</div>
							)}
							{data.EventOne && (
								<div className="p-d-flex">
									<b>EventOne:</b> {data.EventOne}
								</div>
							)}
							{data.EventOneDescription && (
								<div className="p-d-flex">
									<b>EventOneDescription:</b>{" "}
									{data.EventOneDescription}
								</div>
							)}
							{data.EventOneRecording && (
								<div className="p-d-flex">
									<b>EventOneRecording:</b> {data.EventOneRecording}
								</div>
							)}
							{data.EventTwo && (
								<div className="p-d-flex">
									<b>EventTwo:</b> {data.EventTwo}
								</div>
							)}
							{data.EventTwoDescription && (
								<div className="p-d-flex">
									<b>EventTwoDescription:</b>{" "}
									{data.EventTwoDescription}
								</div>
							)}
							{data.EventTwoRecording && (
								<div className="p-d-flex">
									<b>EventTwoRecording:</b> {data.EventTwoRecording}
								</div>
							)}
							{data.EventThree && (
								<div className="p-d-flex">
									<b>EventThree:</b> {data.EventThree}
								</div>
							)}
							{data.EventThreeDescription && (
								<div className="p-d-flex">
									<b>EventThreeDescription:</b>{" "}
									{data.EventThreeDescription}
								</div>
							)}
							{data.EventThreeRecording && (
								<div className="p-d-flex">
									<b>EventThreeRecording:</b>{" "}
									{data.EventThreeRecording}
								</div>
							)}
							{data.NumberOfNewsletters && (
								<div className="p-d-flex">
									<b>NumberOfNewsletters:</b>{" "}
									{data.NumberOfNewsletters}
								</div>
							)}
							{data.NewsletterOne && (
								<div className="p-d-flex">
									<b>NewsletterOne:</b> {data.NewsletterOne}
								</div>
							)}
							{data.NewsletterOneFormat && (
								<div className="p-d-flex">
									<b>NewsletterOneFormat:</b>{" "}
									{data.NewsletterOneFormat}
								</div>
							)}
							{data.NewsletterOneDescription && (
								<div className="p-d-flex">
									<b>NewsletterOneDescription:</b>{" "}
									{data.NewsletterOneDescription}
								</div>
							)}
							{data.NewsletterOneFrequency && (
								<div className="p-d-flex">
									<b>NewsletterOneFrequency:</b>{" "}
									{data.NewsletterOneFrequency}
								</div>
							)}
							{data.NewletterOneUniqueness && (
								<div className="p-d-flex">
									<b>NewletterOneUniqueness:</b>{" "}
									{data.NewletterOneUniqueness}
								</div>
							)}
							{data.NewsletterTwo && (
								<div className="p-d-flex">
									<b>NewsletterTwo:</b> {data.NewsletterTwo}
								</div>
							)}
							{data.NewsletterTwoFormat && (
								<div className="p-d-flex">
									<b>NewsletterTwoFormat:</b>{" "}
									{data.NewsletterTwoFormat}
								</div>
							)}
							{data.NewsletterTwoDescription && (
								<div className="p-d-flex">
									<b>NewsletterTwoDescription:</b>{" "}
									{data.NewsletterTwoDescription}
								</div>
							)}
							{data.NewsletterTwoFrequency && (
								<div className="p-d-flex">
									<b>NewsletterTwoFrequency:</b>{" "}
									{data.NewsletterTwoFrequency}
								</div>
							)}
							{data.NewletterTwoUniqueness && (
								<div className="p-d-flex">
									<b>NewletterTwoUniqueness:</b>{" "}
									{data.NewletterTwoUniqueness}
								</div>
							)}
							{data.NewsletterThree && (
								<div className="p-d-flex">
									<b>NewsletterThree:</b> {data.NewsletterThree}
								</div>
							)}
							{data.NewsletterThreeFormat && (
								<div className="p-d-flex">
									<b>NewsletterThreeFormat:</b>{" "}
									{data.NewsletterThreeFormat}
								</div>
							)}
							{data.NewsletterThreeDescription && (
								<div className="p-d-flex">
									<b>NewsletterThreeDescription:</b>{" "}
									{data.NewsletterThreeDescription}
								</div>
							)}
							{data.NewsletterThreeFrequency && (
								<div className="p-d-flex">
									<b>NewsletterThreeFrequency:</b>{" "}
									{data.NewsletterThreeFrequency}
								</div>
							)}
							{data.NewletterThreeUniqueness && (
								<div className="p-d-flex">
									<b>NewletterThreeUniqueness:</b>{" "}
									{data.NewletterThreeUniqueness}
								</div>
							)}
							{data.ReportsResearch && (
								<div className="p-d-flex">
									<b>ReportsResearch:</b> {data.ReportsResearch}
								</div>
							)}
							{data.NumberOfReports && (
								<div className="p-d-flex">
									<b>NumberOfReports:</b> {data.NumberOfReports}
								</div>
							)}
							{data.ReportResearchDescription && (
								<div className="p-d-flex">
									<b>ReportResearchDescription:</b>{" "}
									{data.ReportResearchDescription}
								</div>
							)}
							{data.CompetitivePosition && (
								<div className="p-d-flex">
									<b>CompetitivePosition:</b>{" "}
									{data.CompetitivePosition}
								</div>
							)}
							{data.Competitor && (
								<div className="p-d-flex">
									<b>Competitor:</b> {data.Competitor}
								</div>
							)}
							{data.RetailPrice && (
								<div className="p-d-flex">
									<b>RetailPrice:</b> {data.RetailPrice}
								</div>
							)}
						</div>
					</TabPanel>
				</TabView>
			</div>
		);
	};

	// ******************************************************************* RETURN *******************************************************************

	return (
		<div>
			{error && <p>Error: {error.message}</p>}
			<DataTable
				ref={dt}
				value={products}
				header={header}
				footer={footer}
				paginator
				rows={pageSize}
				totalRecords={totalProducts}
				lazy
				first={page - 1}
				onPage={(e) => {
					setPage(e.first / pageSize + 1);
					setPageSize(e.rows);
				}}
				loading={isLoading}
				expandedRows={expandedRows}
				onRowToggle={(e) => setExpandedRows(e.data)}
				rowExpansionTemplate={rowExpansionTemplate}
				sortField={sort.field}
				sortOrder={sort.order}
				onSort={(e) => setSort({ field: e.sortField, order: e.sortOrder })}
				filters={filters}
				filterDisplay="row"
				globalFilter={globalFilterValue}
			>
				<Column expander style={{ width: "3em" }} />
				<Column
					field="Client"
					header="Client"
					style={{ width: "15%" }}
					filter
					filterPlaceholder="Search by Client"
					showFilterMenu={false}
					showClearButton={false}
					sortable
					filterElement={
						<Dropdown
							value={filters.Client ? filters.Client.value : null}
							options={clientFilterItems}
							onChange={onClientFilterChange}
							placeholder="Select a Client"
							display="chip"
							showClear
						/>
					}
				/>
				<Column
					field="Category"
					header="Category"
					style={{ width: "15%" }}
					filter
					filterPlaceholder="Search by Category"
					showFilterMenu={false}
					showClearButton={false}
					sortable
					filterElement={
						<Dropdown
							value={filters.Category ? filters.Category.value : null}
							options={categoryFilterItems}
							onChange={onCategoryFilterChange}
							placeholder="Select a Category"
							display="chip"
							showClear
						/>
					}
				/>
				<Column
					field="PublicationType"
					header="Publication Type"
					style={{ width: "15%" }}
					filter
					filterPlaceholder="Search by PubType"
					showFilterMenu={false}
					showClearButton={false}
					sortable
					filterElement={
						<Dropdown
							value={
								filters.PublicationType
									? filters.PublicationType.value
									: null
							}
							options={pubTypeFilterItems}
							onChange={onPubTypeFilterChange}
							placeholder="Select a PubType"
							display="chip"
							showClear
						/>
					}
				/>
				<Column
					field="ProductName"
					header="Product Name"
					// style={{ width: "40%" }}
					// filter
					showFilterMenu={false}
					showClearButton={false}
					// filterPlaceholder="Search by Product Name"
					sortable
					// filterElement={
					// 	<InputText
					// 		onChange={(e) => onFilterChange(e, "ProductName")}
					// 		placeholder="Search by Product Name"
					// 	/>
					// }
				/>
			</DataTable>
		</div>
	);
};

export default ProductTablePrime;
