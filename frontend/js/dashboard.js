const token =
    localStorage.getItem("access_token");

if (!token) {

    window.location.href =
        "login.html";
}

async function loadUser() {

    const response = await fetch(
        `${API_BASE_URL}/me`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    document.getElementById(
        "userInfo"
    ).textContent =
        `Logged in as: ${data.email}`;
}

loadUser();

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem(
            "access_token"
        );

        window.location.href =
            "login.html";
    });

const jobForm =
    document.getElementById("job-form");

jobForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const company =
            document.getElementById(
                "company"
            ).value;

        const role =
            document.getElementById(
                "role"
            ).value;

        const status =
            document.getElementById(
                "status"
            ).value;

        const response =
            await fetch(
                `${API_BASE_URL}/jobs/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        company,
                        role,
                        status
                    })
                }
            );

        const data =
            await response.json();

        const message =
            document.getElementById(
                "message"
            );

        if (response.ok) {

            message.textContent =
                "Job created successfully";

            loadJobs();

        } else {

            message.textContent =
                data.detail;
        }
    }
);

async function deleteJob(jobId) {

    const response = await fetch(
        `${API_BASE_URL}/jobs/${jobId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.ok) {
        loadJobs();
    }
}

async function loadJobs() {

    const status =
        document.getElementById(
            "filter-status"
        ).value;

    let url =
        `${API_BASE_URL}/jobs/`;

    if (status) {
        url += `?status=${status}`;
    }

    const response =
        await fetch(url, {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        });

    document
        .getElementById("filter-status")
        .addEventListener(
            "change",
            loadJobs
        );

    const jobs =
        await response.json();

    const jobsList =
        document.getElementById(
            "jobs-list"
        );

    jobsList.innerHTML = "";

    jobs.forEach(job => {

        const li =
            document.createElement("li");

        li.classList.add("job-item");

        li.innerHTML = `
    <span>
        <strong>${job.company}</strong><br>
        ${job.role}
    </span>

    <span>${job.status}</span>
`;

        jobsList.appendChild(li);

    });

    li.classList.add("job-item");

    li.innerHTML = `
    <div>
        <strong>${job.company}</strong><br>
        ${job.role}
    </div>

    <div>
        <select
    onchange="updateStatus(${job.id}, this.value)"
>
    <option value="APPLIED"
        ${job.status === "APPLIED" ? "selected" : ""}
    >
        Applied
    </option>

    <option value="INTERVIEW"
        ${job.status === "INTERVIEW" ? "selected" : ""}
    >
        Interview
    </option>

    <option value="OFFER"
        ${job.status === "OFFER" ? "selected" : ""}
    >
        Offer
    </option>

    <option value="REJECTED"
        ${job.status === "REJECTED" ? "selected" : ""}
    >
        Rejected
    </option>

</select>
        <button onclick="deleteJob(${job.id})">
            Delete
        </button>
    </div>
`;

}

loadJobs();

async function updateStatus(
    jobId,
    status
) {

    const response = await fetch(
        `${API_BASE_URL}/jobs/${jobId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json",

                Authorization:
                    `Bearer ${token}`
            },

            body: JSON.stringify({
                status
            })
        }
    );

    if (response.ok) {
        loadJobs();
    }
}