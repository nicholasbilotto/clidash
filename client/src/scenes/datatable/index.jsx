import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TabView, TabPanel } from "primereact/tabview";
import { useGetProductsTableQuery } from "state/api";
import { Dropdown } from "primereact/dropdown"; // Import Dropdown
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "../../App.css";

const ProductTablePrime = () => {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(100);
	const [expandedRows, setExpandedRows] = useState(null);
	const [sort, setSort] = useState({ field: "ProductName", order: 1 });
	const [filters, setFilters] = useState({});
	const [globalFilterValue, setGlobalFilterValue] = useState();

	const sortParam = encodeURIComponent(JSON.stringify(sort));

	// Construct query parameters object
	const queryParam = {
		page: page,
		pageSize: pageSize,
		sort: sortParam,
		filters: encodeURIComponent(JSON.stringify(filters)),
		globalFilter: globalFilterValue,
	};

	const { data, error, isLoading, refetch } =
		useGetProductsTableQuery(queryParam);

	const products = data?.docs || [];
	const totalProducts = data?.totalDocs || 0;

	const itemsPerPageOptions = [
		{ label: "100", value: 100 },
		{ label: "250", value: 250 },
		{ label: "500", value: 500 },
		{ label: "1000", value: 1000 },
	];

	const onFilterChange = (e, field) => {
		let newFilters = { ...filters };
		newFilters[field] = {
			value: e.target.value,
			matchMode: FilterMatchMode.CONTAINS,
		};
		setFilters(newFilters);
	};

	const onGlobalFilterChange = (e) => {
		setGlobalFilterValue(e.target.value);
	};

	const cols = [
		{ field: "Client", header: "Client" },
		{ field: "Category", header: "Category" },
		{ field: "ProductName", header: "Product Name" },
		// ... add other columns as needed
	];

	const exportColumns = cols.map((col) => ({
		title: col.header,
		dataKey: col.field,
	}));

	const exportPdf = () => {
		import("jspdf").then((jsPDF) => {
			import("jspdf-autotable").then(() => {
				const doc = new jsPDF.default(0, 0);
				doc.autoTable(exportColumns, products);
				doc.save("products.pdf");
			});
		});
	};

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
				<span className="p-input-icon-left" style={{ marginLeft: "16px" }}>
					<i className="pi pi-search" />
					<InputText
						value={globalFilterValue}
						onChange={onGlobalFilterChange}
						placeholder="Keyword Search"
					/>
				</span>
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
				<Button
					type="button"
					icon="pi pi-file-pdf"
					className="p-button-warning"
					rounded
					onClick={exportPdf}
					data-pr-tooltip="PDF"
				/>
			</div>
		</div>
	);

	const footer = `${products ? products.length : 0} of  ${totalProducts}`;

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
							{/* ... Add more fields as per requirement */}
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
					{/* Add more TabPanels as per your data grouping */}
				</TabView>
			</div>
		);
	};

	return (
		<div>
			{error && <p>Error: {error.message}</p>}
			<DataTable
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
					filter
					showFilterMenu={false}
					filterPlaceholder="Search by Client"
					sortable
					filterElement={
						<InputText
							onChange={(e) => onFilterChange(e, "Client")}
							placeholder="Search by Client"
						/>
					}
				/>
				<Column
					field="Category"
					header="Category"
					filter
					showFilterMenu={false}
					filterPlaceholder="Search by Category"
					sortable
					filterElement={
						<InputText
							onChange={(e) => onFilterChange(e, "Category")}
							placeholder="Search by Category"
						/>
					}
				/>
				<Column
					field="ProductName"
					header="Product Name"
					filter
					showFilterMenu={false}
					filterPlaceholder="Search by Product Name"
					sortable
					filterElement={
						<InputText
							onChange={(e) => onFilterChange(e, "ProductName")}
							placeholder="Search by Product Name"
						/>
					}
				/>
			</DataTable>
		</div>
	);
};

export default ProductTablePrime;
