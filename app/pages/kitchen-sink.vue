<!-- eslint-disable @stylistic/max-len -->
<template>
  <div>
    <LayoutPageHeader>
      Kitchen Sink
    </LayoutPageHeader>

    <h3>Default Buttons</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <button class="btn btn-neutral">
        Neutral
      </button>
      <button class="btn btn-primary">
        Primary
      </button>
      <button class="btn btn-secondary">
        Secondary
      </button>
      <button class="btn btn-accent">
        Accent
      </button>
      <button class="btn btn-info">
        Info
      </button>
      <button class="btn btn-success">
        Success
      </button>
      <button class="btn btn-warning">
        Warning
      </button>
      <button class="btn btn-error">
        Error
      </button>
    </div>

    <h3>Soft Buttons</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <button class="btn btn-soft">
        Default
      </button>
      <button class="btn btn-soft btn-primary">
        Primary
      </button>
      <button class="btn btn-soft btn-secondary">
        Secondary
      </button>
      <button class="btn btn-soft btn-accent">
        Accent
      </button>
      <button class="btn btn-soft btn-info">
        Info
      </button>
      <button class="btn btn-soft btn-success">
        Success
      </button>
      <button class="btn btn-soft btn-warning">
        Warning
      </button>
      <button class="btn btn-soft btn-error">
        Error
      </button>
    </div>

    <h3>Outline Buttons</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <button class="btn btn-outline">
        Default
      </button>
      <button class="btn btn-outline btn-primary">
        Primary
      </button>
      <button class="btn btn-outline btn-secondary">
        Secondary
      </button>
      <button class="btn btn-outline btn-accent">
        Accent
      </button>
      <button class="btn btn-outline btn-info">
        Info
      </button>
      <button class="btn btn-outline btn-success">
        Success
      </button>
      <button class="btn btn-outline btn-warning">
        Warning
      </button>
      <button class="btn btn-outline btn-error">
        Error
      </button>
    </div>

    <h3>Dash Buttons</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <button class="btn btn-dash">
        Default
      </button>
      <button class="btn btn-dash btn-primary">
        Primary
      </button>
      <button class="btn btn-dash btn-secondary">
        Secondary
      </button>
      <button class="btn btn-dash btn-accent">
        Accent
      </button>
      <button class="btn btn-dash btn-info">
        Info
      </button>
      <button class="btn btn-dash btn-success">
        Success
      </button>
      <button class="btn btn-dash btn-warning">
        Warning
      </button>
      <button class="btn btn-dash btn-error">
        Error
      </button>
    </div>

    <h3>Ghost and Link Buttons</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <button class="btn btn-ghost">
        Ghost
      </button>
      <button class="btn btn-link">
        Link
      </button>
    </div>

    <h3>Dropdown</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <details class="dropdown">
        <summary class="btn m-1">
          open or close
        </summary>
        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </details>
    </div>

    <h3>Modal</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <!-- Open the modal using ID.showModal() method -->
      <button
        class="btn"
        onclick="my_modal.showModal()"
      >
        open modal
      </button>
      <dialog
        id="my_modal"
        class="modal"
      >
        <div class="modal-box">
          <h3 class="text-lg font-bold">
            Hello!
          </h3>
          <p class="py-4">
            Press ESC key or click the button below to close
          </p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>

    <h3>Accordion</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="join join-vertical bg-base-100">
        <div class="collapse collapse-arrow join-item border-base-300 border">
          <input
            type="radio"
            name="my-accordion-4"
            checked="checked"
          >
          <div class="collapse-title font-semibold">
            How do I create an account?
          </div>
          <div class="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the registration process.
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border-base-300 border">
          <input
            type="radio"
            name="my-accordion-4"
          >
          <div class="collapse-title font-semibold">
            I forgot my password. What should I do?
          </div>
          <div class="collapse-content text-sm">
            Click on "Forgot Password" on the login page and follow the instructions sent to your email.
          </div>
        </div>
        <div class="collapse collapse-arrow join-item border-base-300 border">
          <input
            type="radio"
            name="my-accordion-4"
          >
          <div class="collapse-title font-semibold">
            How do I update my profile information?
          </div>
          <div class="collapse-content text-sm">
            Go to "My Account" settings and select "Edit Profile" to make changes.
          </div>
        </div>
      </div>
    </div>

    <h3>Badge</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="badge badge-primary">
        Primary
      </div>
      <div class="badge badge-secondary">
        Secondary
      </div>
      <div class="badge badge-accent">
        Accent
      </div>
      <div class="badge badge-neutral">
        Neutral
      </div>
      <div class="badge badge-info">
        Info
      </div>
      <div class="badge badge-success">
        Success
      </div>
      <div class="badge badge-warning">
        Warning
      </div>
      <div class="badge badge-error">
        Error
      </div>
    </div>

    <h3>Badge Soft</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="badge badge-soft badge-primary">
        Primary
      </div>
      <div class="badge badge-soft badge-secondary">
        Secondary
      </div>
      <div class="badge badge-soft badge-accent">
        Accent
      </div>
      <div class="badge badge-soft badge-info">
        Info
      </div>
      <div class="badge badge-soft badge-success">
        Success
      </div>
      <div class="badge badge-soft badge-warning">
        Warning
      </div>
      <div class="badge badge-soft badge-error">
        Error
      </div>
    </div>
    <h3>Badge Outline</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="badge badge-outline badge-primary">
        Primary
      </div>
      <div class="badge badge-outline badge-secondary">
        Secondary
      </div>
      <div class="badge badge-outline badge-accent">
        Accent
      </div>
      <div class="badge badge-outline badge-info">
        Info
      </div>
      <div class="badge badge-outline badge-success">
        Success
      </div>
      <div class="badge badge-outline badge-warning">
        Warning
      </div>
      <div class="badge badge-outline badge-error">
        Error
      </div>
    </div>

    <h3>Card</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          >
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            Card Title
            <div class="badge badge-secondary">
              NEW
            </div>
          </h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">
              Fashion
            </div>
            <div class="badge badge-outline">
              Products
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3>List</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <ul class="list bg-base-100 rounded-box shadow-md">
        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Most played songs this week
        </li>

        <li class="list-row">
          <div class="text-4xl font-thin opacity-30 tabular-nums">
            01
          </div>
          <div>
            <img
              class="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            >
          </div>
          <div class="list-col-grow">
            <div>Dio Lupa</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              Remaining Reason
            </div>
          </div>
          <button class="btn btn-square btn-ghost">
            <svg
              class="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            ><g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            ><path d="M6 3L20 12 6 21 6 3z" /></g></svg>
          </button>
        </li>

        <li class="list-row">
          <div class="text-4xl font-thin opacity-30 tabular-nums">
            02
          </div>
          <div>
            <img
              class="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/4@94.webp"
            >
          </div>
          <div class="list-col-grow">
            <div>Ellie Beilish</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              Bears of a fever
            </div>
          </div>
          <button class="btn btn-square btn-ghost">
            <svg
              class="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            ><g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            ><path d="M6 3L20 12 6 21 6 3z" /></g></svg>
          </button>
        </li>

        <li class="list-row">
          <div class="text-4xl font-thin opacity-30 tabular-nums">
            03
          </div>
          <div>
            <img
              class="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/3@94.webp"
            >
          </div>
          <div class="list-col-grow">
            <div>Sabrino Gardener</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              Cappuccino
            </div>
          </div>
          <button class="btn btn-square btn-ghost">
            <svg
              class="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            ><g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            ><path d="M6 3L20 12 6 21 6 3z" /></g></svg>
          </button>
        </li>
      </ul>
    </div>

    <h3>Stats</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="stat-title">
            Downloads
          </div>
          <div class="stat-value">
            31K
          </div>
          <div class="stat-desc">
            Jan 1st - Feb 1st
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <div class="stat-title">
            New Users
          </div>
          <div class="stat-value">
            4,200
          </div>
          <div class="stat-desc">
            ↗︎ 400 (22%)
          </div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <div class="stat-title">
            New Registers
          </div>
          <div class="stat-value">
            1,200
          </div>
          <div class="stat-desc">
            ↘︎ 90 (14%)
          </div>
        </div>
      </div>
    </div>

    <h3>Table</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            <!-- row 2 -->
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            <!-- row 3 -->
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <h3>Timeline</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <ul class="timeline">
        <li>
          <div class="timeline-start timeline-box">
            First Macintosh computer
          </div>
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="text-primary h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <hr class="bg-primary">
        </li>
        <li>
          <hr class="bg-primary">
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="text-primary h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-end timeline-box">
            iMac
          </div>
          <hr class="bg-primary">
        </li>
        <li>
          <hr class="bg-primary">
          <div class="timeline-start timeline-box">
            iPod
          </div>
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="text-primary h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <hr>
        </li>
        <li>
          <hr>
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="timeline-end timeline-box">
            iPhone
          </div>
          <hr>
        </li>
        <li>
          <hr>
          <div class="timeline-start timeline-box">
            Apple Watch
          </div>
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </li>
      </ul>
    </div>

    <h3>Breadcrumbs</h3>

    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-4 w-4 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Home
            </a>
          </li>
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-4 w-4 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Documents
            </a>
          </li>
          <li>
            <span class="inline-flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-4 w-4 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Add Document
            </span>
          </li>
        </ul>
      </div>
    </div>

    <h3>Pagination</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <div class="join">
        <button class="join-item btn">
          1
        </button>
        <button class="join-item btn">
          2
        </button>
        <button class="join-item btn btn-disabled">
          ...
        </button>
        <button class="join-item btn">
          99
        </button>
        <button class="join-item btn">
          100
        </button>
      </div>
    </div>

    <h3>Steps</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <ul class="steps steps-vertical lg:steps-horizontal">
        <li class="step step-primary">
          Register
        </li>
        <li class="step step-primary">
          Choose plan
        </li>
        <li class="step">
          Purchase
        </li>
        <li class="step">
          Receive Product
        </li>
      </ul>
    </div>

    <h3>Tabs</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <!-- name of each tab group should be unique -->
      <div class="tabs tabs-lift">
        <input
          type="radio"
          name="my_tabs_3"
          class="tab"
          aria-label="Tab 1"
        >
        <div class="tab-content bg-base-100 border-base-300 p-6">
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          class="tab"
          aria-label="Tab 2"
          checked="checked"
        >
        <div class="tab-content bg-base-100 border-base-300 p-6">
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          class="tab"
          aria-label="Tab 3"
        >
        <div class="tab-content bg-base-100 border-base-300 p-6">
          Tab content 3
        </div>
      </div>
    </div>

    <h3>Alert</h3>
    <div class="flex flex-col items-center justify-center gap-4">
      <div
        role="alert"
        class="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-info h-6 w-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>12 unread messages. Tap to see.</span>
      </div>
      <div
        role="alert"
        class="alert alert-info"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>New software update available.</span>
      </div>
      <div
        role="alert"
        class="alert alert-success"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Your purchase has been confirmed!</span>
      </div>
      <div
        role="alert"
        class="alert alert-warning"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>Warning: Invalid email address!</span>
      </div>
      <div
        role="alert"
        class="alert alert-error"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Task failed successfully.</span>
      </div>
      <div
        role="alert"
        class="alert alert-info alert-soft"
      >
        <span>12 unread messages. Tap to see.</span>
      </div>
      <div
        role="alert"
        class="alert alert-success alert-soft"
      >
        <span>Your purchase has been confirmed!</span>
      </div>
      <div
        role="alert"
        class="alert alert-warning alert-soft"
      >
        <span>Warning: Invalid email address!</span>
      </div>
      <div
        role="alert"
        class="alert alert-error alert-soft"
      >
        <span>Error! Task failed successfully.</span>
      </div>
    </div>

    <h3>Fieldset</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">
          Login
        </legend>

        <label class="label">Email</label>
        <input
          type="email"
          class="input"
          placeholder="Email"
        >

        <label class="label">Password</label>
        <input
          type="password"
          class="input"
          placeholder="Password"
        >

        <button class="btn btn-neutral mt-4">
          Login
        </button>
      </fieldset>
    </div>

    <h3>Labels</h3>
    <div class="flex flex-col items-center justify-center gap-4">
      <label class="input">
        <span class="label">https://</span>
        <input
          type="text"
          placeholder="URL"
        >
      </label>
      <label class="input">
        <input
          type="text"
          placeholder="domain name"
        >
        <span class="label">.com</span>
      </label>
      <label class="select">
        <span class="label">Type</span>
        <select>
          <option>Personal</option>
          <option>Business</option>
        </select>
      </label>
      <label class="floating-label">
        <span>Your Email</span>
        <input
          type="text"
          placeholder="mail@site.com"
          class="input input-md"
        >
      </label>
    </div>

    <h3>Select</h3>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <select class="select">
        <option
          disabled
          selected
        >
          Pick a color
        </option>
        <option>Crimson</option>
        <option>Amber</option>
        <option>Velvet</option>
      </select>
    </div>
  </div>
</template>

<script setup>
</script>
