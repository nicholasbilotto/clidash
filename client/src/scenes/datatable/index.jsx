import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TabView, TabPanel } from "primereact/tabview";
import { useGetProductsTableQuery } from "state/api";
import { Dropdown } from "primereact/dropdown"; // Import Dropdown
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

	const sortParam = encodeURIComponent(JSON.stringify(sort));

	// Construct query parameters object
	const queryParam = {
		page: page,
		pageSize: pageSize,
		sort: sortParam,
		filters: encodeURIComponent(JSON.stringify(filters)),
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

	const header = (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<span className="text-xl text-900 font-bold">Products</span>
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
					style={{ width: "150px" }}
				/>
			</div>
		</div>
	);

	const footer = `${products ? products.length : 0} of  ${totalProducts}`;

	const handleFilterChange = (e) => {
		const { filters } = e;
		setFilters(filters);
		refetch();
	};

	const rowExpansionTemplate = (data) => {
		return (
			<div className="p-grid p-dir-col">
				<TabView className="p-mt-2">
					<TabPanel header="General Info">
						<div className="p-d-flex p-flex-column">
							<div className="p-d-flex">
								<b>ISBN:</b> {data.ISBN}
							</div>
							<div className="p-d-flex">
								<b>ISSN:</b> {data.ISSN}
							</div>
							<div className="p-d-flex">
								<b>Url:</b> {data.Url}
							</div>
							<div className="p-d-flex">
								<b>PublicationType:</b> {data.PublicationType}
							</div>
							<div className="p-d-flex">
								<b>FirstYearPublished:</b> {data.FirstYearPublished}
							</div>
							<div className="p-d-flex">
								<b>DOI:</b> {data.DOI}
							</div>
							<div className="p-d-flex">
								<b>Description:</b> {data.Description}
							</div>
							{/* ... Add more fields as per requirement */}
						</div>
					</TabPanel>
					<TabPanel header="Additional Details">
						<div className="p-d-flex p-flex-column">
							<div className="p-d-flex">
								<b>IssuesPerYear:</b> {data.IssuesPerYear}
							</div>
							<div className="p-d-flex">
								<b>PublicationFormats:</b> {data.PublicationFormats}
							</div>
							<div className="p-d-flex">
								<b>OnlineContentFrequency:</b>{" "}
								{data.OnlineContentFrequency}
							</div>
							<div className="p-d-flex">
								<b>TopicsCovered:</b> {data.TopicsCovered}
							</div>
							<div className="p-d-flex">
								<b>FirstYearPublished:</b> {data.FirstYearPublished}
							</div>
							<div className="p-d-flex">
								<b>DOI:</b> {data.DOI}
							</div>
							<div className="p-d-flex">
								<b>Uniqueness:</b> {data.Uniqueness}
							</div>
							<div className="p-d-flex">
								<b>AverageNumberYearly:</b> {data.AverageNumberYearly}
							</div>
							<div className="p-d-flex">
								<b>DigitalArchive:</b> {data.DigitalArchive}
							</div>
							<div className="p-d-flex">
								<b>DigitalArchiveDate:</b> {data.DigitalArchiveDate}
							</div>
							<div className="p-d-flex">
								<b>ArchiveCount:</b> {data.ArchiveCount}
							</div>
							<div className="p-d-flex">
								<b>Publisher:</b> {data.Publisher}
							</div>
							<div className="p-d-flex">
								<b>StaffDescription:</b> {data.StaffDescription}
							</div>
							<div className="p-d-flex">
								<b>EditorName:</b> {data.EditorName}
							</div>
							<div className="p-d-flex">
								<b>MarquisEditor:</b> {data.MarquisEditor}
							</div>
							<div className="p-d-flex">
								<b>Freelancers:</b> {data.Freelancers}
							</div>
							<div className="p-d-flex">
								<b>OwnFreelancerContent:</b> {data.OwnFreelancerContent}
							</div>
							<div className="p-d-flex">
								<b>OriginalVideoMedia:</b> {data.OriginalVideoMedia}
							</div>
							<div className="p-d-flex">
								<b>VideoMediaRights:</b> {data.VideoMediaRights}
							</div>
							<div className="p-d-flex">
								<b>OriginalPhotoMedia:</b> {data.OriginalPhotoMedia}
							</div>
							<div className="p-d-flex">
								<b>PhotoMediaRights:</b> {data.PhotoMediaRights}
							</div>
							<div className="p-d-flex">
								<b>OriginalGraphs:</b> {data.OriginalGraphs}
							</div>
							<div className="p-d-flex">
								<b>GraphsRights:</b> {data.GraphsRights}
							</div>
							<div className="p-d-flex">
								<b>AudienceDescription:</b> {data.AudienceDescription}
							</div>
							<div className="p-d-flex">
								<b>Circulation:</b> {data.Circulation}
							</div>
							<div className="p-d-flex">
								<b>AnnualTraffic:</b> {data.AnnualTraffic}
							</div>
							<div className="p-d-flex">
								<b>SubscriptionType:</b> {data.SubscriptionType}
							</div>
							<div className="p-d-flex">
								<b>AnnualSubPrice:</b> {data.AnnualSubPrice}
							</div>
							<div className="p-d-flex">
								<b>IndividualCopyPrice:</b> {data.IndividualCopyPrice}
							</div>
							<div className="p-d-flex">
								<b>NumberOfEvents:</b> {data.NumberOfEvents}
							</div>
							<div className="p-d-flex">
								<b>EventOne:</b> {data.EventOne}
							</div>
							<div className="p-d-flex">
								<b>EventOneDescription:</b> {data.EventOneDescription}
							</div>
							<div className="p-d-flex">
								<b>EventOneRecording:</b> {data.EventOneRecording}
							</div>
							<div className="p-d-flex">
								<b>EventTwo:</b> {data.EventTwo}
							</div>
							<div className="p-d-flex">
								<b>EventTwoDescription:</b> {data.EventTwoDescription}
							</div>
							<div className="p-d-flex">
								<b>EventTwoRecording:</b> {data.EventTwoRecording}
							</div>
							<div className="p-d-flex">
								<b>EventThree:</b> {data.EventThree}
							</div>
							<div className="p-d-flex">
								<b>EventThreeDescription:</b>{" "}
								{data.EventThreeDescription}
							</div>
							<div className="p-d-flex">
								<b>EventThreeRecording:</b> {data.EventThreeRecording}
							</div>
							<div className="p-d-flex">
								<b>NumberOfNewsletters:</b> {data.NumberOfNewsletters}
							</div>
							<div className="p-d-flex">
								<b>NewsletterOne:</b> {data.NewsletterOne}
							</div>
							<div className="p-d-flex">
								<b>NewsletterOneFormat:</b> {data.NewsletterOneFormat}
							</div>
							<div className="p-d-flex">
								<b>NewsletterOneDescription:</b>{" "}
								{data.NewsletterOneDescription}
							</div>
							<div className="p-d-flex">
								<b>NewsletterOneFrequency:</b>{" "}
								{data.NewsletterOneFrequency}
							</div>
							<div className="p-d-flex">
								<b>NewletterOneUniqueness:</b>{" "}
								{data.NewletterOneUniqueness}
							</div>
							<div className="p-d-flex">
								<b>NewsletterTwo:</b> {data.NewsletterTwo}
							</div>
							<div className="p-d-flex">
								<b>NewsletterTwoFormat:</b> {data.NewsletterTwoFormat}
							</div>
							<div className="p-d-flex">
								<b>NewsletterTwoDescription:</b>{" "}
								{data.NewsletterTwoDescription}
							</div>
							<div className="p-d-flex">
								<b>NewsletterTwoFrequency:</b>{" "}
								{data.NewsletterTwoFrequency}
							</div>
							<div className="p-d-flex">
								<b>NewletterTwoUniqueness:</b>{" "}
								{data.NewletterTwoUniqueness}
							</div>
							<div className="p-d-flex">
								<b>NewsletterThree:</b> {data.NewsletterThree}
							</div>
							<div className="p-d-flex">
								<b>NewsletterThreeFormat:</b>{" "}
								{data.NewsletterThreeFormat}
							</div>
							<div className="p-d-flex">
								<b>NewsletterThreeDescription:</b>
								{data.NewsletterThreeDescription}
							</div>
							<div className="p-d-flex">
								<b>NewsletterThreeFrequency:</b>{" "}
								{data.NewsletterThreeFrequency}
							</div>
							<div className="p-d-flex">
								<b>NewletterThreeUniqueness:</b>{" "}
								{data.NewletterThreeUniqueness}
							</div>
							<div className="p-d-flex">
								<b>ReportsResearch:</b> {data.ReportsResearch}
							</div>
							<div className="p-d-flex">
								<b>NumberOfReports:</b> {data.NumberOfReports}
							</div>
							<div className="p-d-flex">
								<b>ReportResearchDescription:</b>{" "}
								{data.ReportResearchDescription}
							</div>
							<div className="p-d-flex">
								<b>CompetitivePosition:</b> {data.CompetitivePosition}
							</div>
							<div className="p-d-flex">
								<b>Competitor:</b> {data.Competitor}
							</div>
							<div className="p-d-flex">
								<b>RetailPrice:</b> {data.RetailPrice}
							</div>
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
				onFilter={handleFilterChange}
			>
				<Column expander style={{ width: "3em" }} />
				<Column
					field="Client"
					header="Client"
					filter
					filterPlaceholder="Search by Client"
					sortable
				/>
				<Column
					field="Category"
					header="Category"
					filter
					filterPlaceholder="Search by Category"
					sortable
				/>
				<Column
					field="ProductName"
					header="Product Name"
					filter
					filterPlaceholder="Search by Product Name"
					sortable
				/>
			</DataTable>
		</div>
	);
};

export default ProductTablePrime;
