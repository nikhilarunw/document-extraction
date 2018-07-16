#!/bin/bash
: '
    # Query to extract Requests with zip files count (min=2, max=200)
    records = RequestHistory.objects.all().annotate(csv_invoice_count=KeyTextTransform('csv_invoice_count','metadata'),zip_file_count=KeyTextTransform('zip_file_count', 'metadata'),).filter(zip_file_count__lte=200, zip_file_count__gte=2)
    # To print list of record id on shell
    for record in records:
        print(str(record.uuid)+',')
'

# array of request id in prod bucket to be copied to test bucket or local file system
test_requests=( '5a57b416-6c6d-4738-88e9-1d69605b96de'
                'a474c106-5ee8-43a4-ac40-c8de70ff002e'
                '870b11df-902e-4739-8253-ffb6ac2069ae'
                '819f977f-b0c1-4c68-adfc-ab14b34a529f'
                '6004ab9f-f307-464a-99e4-be6bab9bb53e'
                'e2b423df-d196-4a43-b871-16a759345da8'
                'eb4a5e22-685d-4215-8cdd-2ef199951d0b'
                '14dc5608-e31d-4962-b29a-bcb62a6efabf'
                'b81c46ad-7858-448c-812c-e9184ffd0b33'
                'ebd80028-25b9-4157-8af6-fedf38b9f59c'
                '34a48763-d818-4422-a207-137506f182a5'
                '55fd60bb-b908-4cbb-b302-d9584338ffa7'
                '29fb0404-312f-4a86-8d4b-de01c13afa90'
                'b7802692-70b0-4bf3-b20a-2612f7238921'
                '8ef79f79-1697-4710-b1b9-d004006a21ab'
                '240079ab-6a7e-46a2-8120-81769f17bac2'
                'c1deb41b-e422-4623-bce7-43b26b184520'
                '9fd27114-20fb-4bce-959e-cbabc38ddd1f'
                'a6866165-c18f-4c25-a9fd-110f4c387384'
                'c3abaa25-0942-4153-942b-db8128023db8'
                '4f4a35b7-ac56-4f30-9346-fb69a0d1f5e3'
                'aa083ebc-0f9c-4472-927c-4b776bca462a'
                '039826d3-4f3a-42d1-912b-dd141bd85ca1'
                'c4500bdc-baac-4133-bf51-f586ae8eaab3'
                '67073713-7f87-4392-bf2a-0dff79dc9385'
                'a26be27b-fd6a-426d-8182-0f5eb985c7ff'
                '159779ee-13eb-4f46-b0bb-d081cb2a1a08'
                '92390584-b4f9-4eeb-b7fb-d8e0b6b2f797'
                '5cd26bcb-a4fb-47fd-93da-86daaae078ef'
                '56131a0d-6d20-4e6a-afe4-91ab7f87ebd2'
                'f5f13ddd-a934-4717-ace8-e35ffb9c2635'
                '15834469-2c99-414c-9684-f32bc7867287'
                '8129c391-f9a3-47e9-b364-45c4b9438b2f' )

for ix in ${!test_requests[*]}
do
    # Prod => Test
    #aws s3 cp s3://smart-invoice-prod/request_history/"${test_requests[$ix]}" s3://smart-invoice-test/request_history/"${test_requests[$ix]}" --recursive --exclude="*" --include="*.zip"
    #aws s3 cp s3://smart-invoice-prod/request_history/"${test_requests[$ix]}" s3://smart-invoice-test/request_history/"${test_requests[$ix]}" --recursive --exclude="*" --include="*.csv"


    # Prod => Local File System
    #aws s3 cp s3://smart-invoice-prod/request_history/"${test_requests[$ix]}" ../train/request_history/"${test_requests[$ix]}" --recursive --exclude="*" --include="*.zip"
    #aws s3 cp s3://smart-invoice-prod/request_history/"${test_requests[$ix]}" ../train/request_history/"${test_requests[$ix]}" --recursive --exclude="*" --include="*.csv"

    unzip -o ../train/request_history/"${test_requests[$ix]}/zipfile/*.zip" -d ../train/request_history/"${test_requests[$ix]}/invoicefiles/"
    echo "processed-${ix}"
done
