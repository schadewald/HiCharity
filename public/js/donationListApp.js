$(document).ready(() => 
{
    $("#modal-button").click(() => 
    {
        $(".modal-body").html('');
        $.get("/api/donations?apiToken=userT0k3n", (results = {}) => 
        {
            let data = results.data;
            if (!data || !data.donations) return;
            data.donations.forEach((donation) => 
            {
                $(".modal-body").append(
                    `<div>
                    <span class="donation-username">
                    User: ${donation.username}
                    </span>
                    <div class='donation-amount'>
                    $${donation.amount}
                    </div>
                    <div class='donation-timestamp'>
                    Created: ${donation.createdAt}
                    </div>
                    </div>`
                );
            });
        });
    });
});