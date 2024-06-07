CREATE OR REPLACE FUNCTION generate_random_15_digits()
RETURNS TEXT AS $$
DECLARE
    result TEXT := '';
BEGIN
    FOR i IN 1..15 LOOP
        result := result || CAST((random() * 9)::INT AS TEXT);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;


INSERT INTO organizations (id, name, telephone, address, postal_code, city, country, created_at, updated_at)
VALUES
(1, 'Coup de coeur animal', '0646745106', '2 rue des animaux', '30100', 'Alès', 'France', now(), now()),
(2, 'Organization B', '234-567-8901', '456 Second St', '67890', 'CityB', 'CountryB', now(), now()),
(3, 'Organization C', '345-678-9012', '789 Third St', '13579', 'CityC', 'CountryC', now(), now());

INSERT INTO families (id, first_name, last_name, telephone, address, postal_code, city, country, comment, created_at, updated_at)
VALUES
(1, 'John', 'Doe', '987-654-3210', '123 Oak St', '24680', 'CityD', 'CountryD', 'Loves animals', now(), now()),
(2, 'Jane', 'Smith', '876-543-2109', '456 Pine St', '13579', 'CityE', 'CountryE', 'Adopted 3 pets', now(), now()),
(3, 'Bob', 'Johnson', '765-432-1098', '789 Elm St', '98765', 'CityF', 'CountryF', NULL, now(), now()),
(4, 'Alice', 'Davis', '654-321-0987', '101 Maple St', '54321', 'CityG', 'CountryG', 'Has a big yard', now(), now());

// RUN node ace db:seed

INSERT INTO animals (id, identification_number, name, color, birth_date, arrival_date, is_sterilized, sex, species, race, comment, is_adopted, adoption_start, adoption_end, adoptive_family_id, is_hosted, hosting_start, hosting_end, host_family_id, organization_id, created_at, updated_at)
VALUES
(1, generate_random_15_digits(), 'Buddy', 'Brown', '2020-01-15', '2021-02-20', true, 'mâle', 'chien', 'Labrador', NULL, true, '2021-03-01', NULL, 1, false, NULL, NULL, NULL, 1, now(), now()),
(2, generate_random_15_digits(), 'Mittens', 'Black', '2019-04-22', '2020-05-18', true, 'femelle', 'chat', 'Siamese', NULL, true, '2020-06-01', NULL, 2, false, NULL, NULL, NULL, 1, now(), now()),
(3, generate_random_15_digits(), 'Charlie', 'Golden', '2018-11-05', '2019-12-10', true, 'mâle', 'chien', 'Golden Retriever', NULL, false, NULL, NULL, NULL, true, '2019-12-20', NULL, 3, 2, now(), now()),
(4, generate_random_15_digits(), 'Lucy', 'Gray', '2021-02-17', '2022-03-15', false, 'femelle', 'chat', 'British Shorthair', 'Shy and quiet', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(5, generate_random_15_digits(), 'Rocky', 'White', '2021-03-22', '2022-04-19', true, 'mâle', 'chien', 'Bulldog', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(6, generate_random_15_digits(), 'Bella', 'Brown', '2019-08-10', '2020-09-15', true, 'femelle', 'chien', 'Poodle', 'Very active', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 1, now(), now()),
(7, generate_random_15_digits(), 'Max', 'Black', '2018-07-18', '2019-08-20', true, 'mâle', 'chat', 'Maine Coon', 'Likes to climb', true, '2019-09-01', NULL, 1, false, NULL, NULL, NULL, 1, now(), now()),
(8, generate_random_15_digits(), 'Luna', 'White', '2020-11-25', '2021-12-30', false, 'femelle', 'chat', 'Persian', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(9, generate_random_15_digits(), 'Cooper', 'Golden', '2017-02-14', '2018-03-16', true, 'mâle', 'chien', 'Beagle', 'Very friendly', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(10, generate_random_15_digits(), 'Molly', 'Gray', '2021-05-05', '2022-06-10', false, 'femelle', 'chat', 'Russian Blue', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(11, generate_random_15_digits(), 'Oliver', 'Orange', '2019-12-15', '2020-12-20', true, 'mâle', 'chat', 'Tabby', NULL, true, '2021-01-01', NULL, 2, false, NULL, NULL, NULL, 1, now(), now()),
(12, generate_random_15_digits(), 'Chloe', 'Black', '2018-04-01', '2019-04-10', true, 'femelle', 'chien', 'Dachshund', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(13, generate_random_15_digits(), 'Bailey', 'Brown', '2020-10-10', '2021-11-15', true, 'femelle', 'chat', 'Sphynx', 'Very affectionate', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 1, now(), now()),
(14, generate_random_15_digits(), 'Jack', 'Golden', '2019-03-30', '2020-04-05', true, 'mâle', 'chien', 'Cocker Spaniel', 'Playful', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(15, generate_random_15_digits(), 'Daisy', 'White', '2017-06-12', '2018-07-14', false, 'femelle', 'chien', 'Shih Tzu', NULL, true, '2018-08-01', NULL, 3, false, NULL, NULL, NULL, 1, now(), now()),
(16, generate_random_15_digits(), 'Zeus', 'Brown', '2021-09-09', '2022-10-12', true, 'mâle', 'chien', 'Rottweiler', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(17, generate_random_15_digits(), 'Sadie', 'Black', '2020-08-08', '2021-09-09', false, 'femelle', 'chien', 'Boxer', 'Very energetic', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(18, generate_random_15_digits(), 'Simba', 'Gray', '2018-02-20', '2019-03-25', true, 'mâle', 'chat', 'British Shorthair', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(19, generate_random_15_digits(), 'Ruby', 'Golden', '2021-07-07', '2022-08-10', false, 'femelle', 'chien', 'Golden Retriever', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 1, now(), now()),
(20, generate_random_15_digits(), 'Ginger', 'Orange', '2019-10-15', '2020-11-18', true, 'femelle', 'chat', 'Bengal', 'Loves water', true, '2020-12-01', NULL, 4, false, NULL, NULL, NULL, 2, now(), now()),
(21, generate_random_15_digits(), 'Buster', 'Brown', '2018-12-12', '2019-01-15', false, 'mâle', 'chien', 'Pit Bull', 'Very strong', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(22, generate_random_15_digits(), 'Maggie', 'Black', '2021-02-20', '2022-03-25', true, 'femelle', 'chien', 'Great Dane', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(23, generate_random_15_digits(), 'Coco', 'White', '2020-01-10', '2021-02-14', true, 'femelle', 'chat', 'Burmese', NULL, true, '2021-03-01', NULL, 1, false, NULL, NULL, NULL, 1, now(), now()),
(24, generate_random_15_digits(), 'Oscar', 'Brown', '2019-11-11', '2020-12-15', false, 'mâle', 'chien', 'Doberman', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(25, generate_random_15_digits(), 'Zoe', 'Gray', '2018-05-05', '2019-06-10', true, 'femelle', 'chat', 'Scottish Fold', 'Likes to sit on laps', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(26, generate_random_15_digits(), 'Thor', 'Black', '2021-01-20', '2022-02-24', true, 'mâle', 'chien', 'German Shepherd', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 1, now(), now()),
(27, generate_random_15_digits(), 'Nala', 'White', '2020-04-25', '2021-05-30', false, 'femelle', 'chat', 'Sphynx', 'Very affectionate', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(28, generate_random_15_digits(), 'Rex', 'Brown', '2018-09-09', '2019-10-10', true, 'mâle', 'chien', 'Dachshund', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(29, generate_random_15_digits(), 'Lily', 'Golden', '2017-07-17', '2018-08-18', false, 'femelle', 'chien', 'Golden Retriever', 'Loves kids', true, '2018-09-01', NULL, 4, false, NULL, NULL, NULL, 1, now(), now()),
(30, generate_random_15_digits(), 'Simone', 'Gray', '2016-08-08', '2017-09-09', true, 'femelle', 'chat', 'Russian Blue', 'Very quiet', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(31, generate_random_15_digits(), 'Diesel', 'Black', '2019-03-20', '2020-04-24', true, 'mâle', 'chien', 'Rottweiler', 'Very loyal', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(32, generate_random_15_digits(), 'Daisy', 'Brown', '2018-06-15', '2019-07-20', false, 'femelle', 'chien', 'Poodle', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 1, now(), now()),
(33, generate_random_15_digits(), 'Milo', 'Gray', '2020-02-02', '2021-03-10', true, 'mâle', 'chat', 'Maine Coon', 'Loves to climb', true, '2021-04-01', NULL, 2, false, NULL, NULL, NULL, 1, now(), now()),
(34, generate_random_15_digits(), 'Sasha', 'White', '2019-10-10', '2020-11-15', false, 'femelle', 'chat', 'Persian', 'Very playful', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(35, generate_random_15_digits(), 'Duke', 'Golden', '2017-04-04', '2018-05-05', true, 'mâle', 'chien', 'Beagle', 'Very friendly', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(36, generate_random_15_digits(), 'Gracie', 'Gray', '2021-12-12', '2022-01-15', false, 'femelle', 'chat', 'Russian Blue', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(37, generate_random_15_digits(), 'Simba', 'Orange', '2019-05-05', '2020-06-10', true, 'mâle', 'chat', 'Tabby', 'Very active', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 1, now(), now()),
(38, generate_random_15_digits(), 'Buster', 'Brown', '2018-09-09', '2019-10-10', false, 'mâle', 'chien', 'Pit Bull', 'Very strong', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(39, generate_random_15_digits(), 'Maggie', 'Black', '2021-02-20', '2022-03-25', true, 'femelle', 'chien', 'Great Dane', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(40, generate_random_15_digits(), 'Coco', 'White', '2020-01-10', '2021-02-14', true, 'femelle', 'chat', 'Burmese', NULL, true, '2021-03-01', NULL, 1, false, NULL, NULL, NULL, 1, now(), now()),
(41, generate_random_15_digits(), 'Oscar', 'Brown', '2019-11-11', '2020-12-15', false, 'mâle', 'chien', 'Doberman', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(42, generate_random_15_digits(), 'Zoe', 'Gray', '2018-05-05', '2019-06-10', true, 'femelle', 'chat', 'Scottish Fold', 'Likes to sit on laps', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(43, generate_random_15_digits(), 'Thor', 'Black', '2021-01-20', '2022-02-24', true, 'mâle', 'chien', 'German Shepherd', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 1, now(), now()),
(44, generate_random_15_digits(), 'Nala', 'White', '2020-04-25', '2021-05-30', false, 'femelle', 'chat', 'Sphynx', 'Very affectionate', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(45, generate_random_15_digits(), 'Rex', 'Brown', '2018-09-09', '2019-10-10', true, 'mâle', 'chien', 'Dachshund', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(46, generate_random_15_digits(), 'Lily', 'Golden', '2017-07-17', '2018-08-18', false, 'femelle', 'chien', 'Golden Retriever', 'Loves kids', true, '2018-09-01', NULL, 4, false, NULL, NULL, NULL, 1, now(), now()),
(47, generate_random_15_digits(), 'Simone', 'Gray', '2016-08-08', '2017-09-09', true, 'femelle', 'chat', 'Russian Blue', 'Very quiet', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 2, now(), now()),
(48, generate_random_15_digits(), 'Diesel', 'Black', '2019-03-20', '2020-04-24', true, 'mâle', 'chien', 'Rottweiler', 'Very loyal', false, NULL, NULL, NULL, false, NULL, NULL, NULL, 3, now(), now()),
(49, generate_random_15_digits(), 'Daisy', 'Brown', '2018-06-15', '2019-07-20', false, 'femelle', 'chien', 'Poodle', NULL, false, NULL, NULL, NULL, false, NULL, NULL, NULL, 1, now(), now()),
(50, generate_random_15_digits(), 'Milo', 'Gray', '2020-02-02', '2021-03-10', true, 'mâle', 'chat', 'Maine Coon', 'Loves to climb', true, '2021-04-01', NULL, 2, false, NULL, NULL, NULL, 1, now(), now());

INSERT INTO cares (id, name, type, start_at, end_at, veterinarian, comment, animal_id, created_at, updated_at)
VALUES
(1, 'Vaccination', 'vaccination', '2021-01-10', NULL, 'Dr. Vet1', NULL, 1, now(), now()),
(2, 'Treatment for fleas', 'traitement', '2021-02-20', '2021-02-27', 'Dr. Vet2', 'Weekly treatment', 2, now(), now()),
(3, 'Surgery', 'chirurgie', '2021-03-05', '2021-03-06', 'Dr. Vet3', 'Neutering', 3, now(), now()),
(4, 'Vaccination', 'vaccination', '2021-04-15', NULL, 'Dr. Vet4', NULL, 4, now(), now()),
(5, 'Vaccination', 'vaccination', '2021-05-10', NULL, 'Dr. Vet5', NULL, 5, now(), now()),
(6, 'Treatment for worms', 'traitement', '2021-06-20', '2021-07-10', 'Dr. Vet6', 'Monthly treatment', 6, now(), now()),
(7, 'Surgery', 'chirurgie', '2021-07-25', '2021-07-26', 'Dr. Vet7', 'Spaying', 7, now(), now()),
(8, 'Vaccination', 'vaccination', '2021-08-30', NULL, 'Dr. Vet8', NULL, 8, now(), now()),
(9, 'Treatment for ticks', 'traitement', '2021-09-10', '2021-09-20', 'Dr. Vet9', 'Weekly treatment', 9, now(), now()),
(10, 'Vaccination', 'vaccination', '2021-10-15', NULL, 'Dr. Vet10', NULL, 10, now(), now()),
(11, 'Surgery', 'chirurgie', '2021-11-05', '2021-11-06', 'Dr. Vet11', 'Neutering', 11, now(), now()),
(12, 'Treatment for fleas', 'traitement', '2021-12-20', '2021-12-27', 'Dr. Vet12', 'Weekly treatment', 12, now(), now()),
(13, 'Vaccination', 'vaccination', '2022-01-15', NULL, 'Dr. Vet13', NULL, 13, now(), now()),
(14, 'Surgery', 'chirurgie', '2022-02-25', '2022-02-26', 'Dr. Vet14', 'Spaying', 14, now(), now()),
(15, 'Treatment for worms', 'traitement', '2022-03-30', '2022-04-10', 'Dr. Vet15', 'Monthly treatment', 15, now(), now()),
(16, 'Vaccination', 'vaccination', '2022-04-25', NULL, 'Dr. Vet16', NULL, 16, now(), now()),
(17, 'Treatment for ticks', 'traitement', '2022-05-20', '2022-06-10', 'Dr. Vet17', 'Weekly treatment', 17, now(), now()),
(18, 'Surgery', 'chirurgie', '2022-06-15', '2022-06-16', 'Dr. Vet18', 'Neutering', 18, now(), now()),
(19, 'Vaccination', 'vaccination', '2022-07-30', NULL, 'Dr. Vet19', NULL, 19, now(), now()),
(20, 'Treatment for fleas', 'traitement', '2022-08-20', '2022-08-27', 'Dr. Vet20', 'Weekly treatment', 20, now(), now());