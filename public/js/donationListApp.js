$(document).ready(() => 
{
    $("#modal-button").click(() => 
    {
        $(".modal-body").html('');
        $.get("/api/donations", (results = {}) => 
        {
            let data = results.data;
            if (!data || !data.donations) return;
            data.donations.forEach((donation) => 
            {
                $(".modal-body").append(
                    `<div>
                    <span class="donation-username">
                    ${donation.username}
                    </span>
                    <div class='donation-amount'>
                    ${donation.amount}
                    </div>
                    <buton class="donate-button" data-id="${donation._id}">
                    Donate
                    </buton>
                    </div>`
                );
            });
        });
    });
});